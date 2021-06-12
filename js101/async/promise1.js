const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

var isThenable = function (obj) {
  return obj && typeof obj["then"] == "function";
};

class MyPromise {
  constructor(executor) {
    // 参数校验
    if (typeof executor !== "function") {
      throw new TypeError("Promise resolver ${executor} is not a function");
    }
    this.initVal();
    this.initBind();
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  initVal() {
    this.status = PENDING;
    this.value = null;
    this.resolveFns = [];
    this.rejectFns = [];
  }

  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  resolve(val) {
    if (this.status === PENDING) {
      this.value = val;
      this.status = FULFILLED;
      this.resolveFns.forEach((fn) => fn(val));
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason;
      this.state = REJECTED;
      this.rejectFns.forEach((fn) => fn(reason));
    }
  }

  then(onResolved, onRejected) {
    // 返回promise 保证链式调用，注意这里每次then都新建了promise
    return new MyPromise((resolve, reject) => {
      const resolvehandle = (val) => {
        // 对于值，回调方法存在就直接执行，否则不变传递下去。
        let res = typeof onResolved === 'function' ? onResolved(val) : val;
        if (isThenable(res)) {
          // 如果onResolved 是promise，那么就增加then
          return res.then((val) => {
            resolve(val);
          });
        } else {
          // 更新状态，执行完了，后面的随便
          return resolve(val);
        }
      };
      const rejecthandle = (val) => {
        var res = typeof onRejected === 'function' ? onRejected(val) : val;
        if (isThenable(res)) {
          res.then(function (val) {
            reject(val);
          });
        } else {
          reject(val);
        }
      };
      if (this.status === FULFILLED) {
        return resolvehandle(this.value);
      }
      if (this.status === REJECTED) {
        return rejecthandle(this.value);
      }
      // 正常加入队列
      this.resolveFns.push(resolvehandle);
      this.rejectFns.push(rejecthandle);
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  delay = function (ms, val) {
    return this.then(function (ori) {
      return MyPromise.delay(ms, val || ori);
    });
  };

  finally = function (fn) {
    return this.then(value => {
      fn();
      return value;
    }, reason => {
      fn();
      throw reason;
    });
  }
}

MyPromise.delay = function (ms, val) {
  return MyPromise(function (resolve, reject) {
    setTimeout(function () {
      resolve(val);
    }, ms);
  });
};
MyPromise.resolve = function (arg) {
  return MyPromise(function (resolve, reject) {
    resolve(arg);
  });
};
MyPromise.reject = function (arg) {
  return MyPromise(function (resolve, reject) {
    reject(arg);
  });
};

MyPromise.all = function (promises) {
  if (!isArray(promises)) {
    throw new TypeError("You must pass an array to all.");
  }
  return MyPromise(function (resolve, reject) {
    var i = 0,
      result = [],
      len = promises.length,
      count = len;
    function resolver(index) {
      return function (value) {
        resolveAll(index, value);
      };
    }

    function rejecter(reason) {
      reject(reason);
    }

    function resolveAll(index, value) {
      result[index] = value;
      if (--count == 0) {
        resolve(result);
      }
    }
    for (; i < len; i++) {
      promises[i].then(resolver(i), rejecter);
    }
  });
};

MyPromise.race = function (promises) {
  if (!isArray(promises)) {
    throw new TypeError("You must pass an array to race.");
  }
  return MyPromise(function (resolve, reject) {
    var i = 0,
      len = promises.length;
    function resolver(value) {
      resolve(value);
    }
    function rejecter(reason) {
      reject(reason);
    }
    for (; i < len; i++) {
      promises[i].then(resolver, rejecter);
    }
  });
};

// new MyPromise((resolve, reject) => {
//     setTimeout(resolve, 200, 'done');
// }).then((res)=>{
//     return new Promise((resolve)=>{
//         console.log(res)
//         setTimeout(resolve, 200, 'done2');
//     })
// }).then((res)=>{
//     console.log('second then>>', res)
// })

new MyPromise((resolve, reject) => {
  resolve("done");
})
  .then((res) => {
    console.log(res);
    throw new Error("then");
  })
  .catch((err) => {
    console.log("catch err>>>", err);
  });
