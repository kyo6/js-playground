function promiseOrCallback(fn, argc) {
  return function (...args) {
    // 判断调用函数时实际传过来的参数数量
    if (args.length > argc) {
      // 这是callback方式调用的
      return fn.apply(null, args);
    }
    // 这是promise方式调用的
    return new Promise((resolve, reject) => {
      // 创建一个callback函数用来对接promise的resolve和reject
      args.push((err, ret) => {
        err ? reject(err) : resolve(ret);
      });
      fn.apply(null, args);
    });
  };
}

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});

function hello(msg, callback) {
   setImmediate(() => {
     callback(null, `hello, ${msg}`);
   });
}

// promiseOrCallback(hello, 1)("test", (err, ret) => {
//   console.log(err, ret);
//   throw new Error("haha");
// });


promiseOrCallback(hello,1)("test").then((ret) => {
    console.log(null, ret);
    throw new Error("haha");
  }).catch((err) => {
    console.log(err);
  });