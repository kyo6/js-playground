// function getJson() {
//   return new Promise((resolve, reject) => {
//     setTimeout(function () {
//       console.log(2);
//       resolve(2);
//     }, 2000);
//   });
// }

// async function testAsync() {
//   const res = await getJson();
//   console.log(res, 3);
// }

// testAsync();

function getConstant() {
  console.log(1);
  return 1;
}

function getJson() {
  setTimeout(function () {
    console.log(2);
  }, 2000);
}


async function getAsyncConstant() {
  console.log(2)
  return 2;
}

async function getPromise() {
  return new Promise((resolved, rejected) => {
    console.log(3)
    resolved(3);
  });
}

async function test() {
  let a = 2;
  let c = 1;
  await getJson();
  let d = 3;
  await getPromise();
  let b = 4;
  await getAsyncConstant();
  return 2;
}


// 上面的代码其实真正的在解析执行的时候是这样的：
function test1() {
  return Promise.resolve().then(function () {
    let a = 2;
    let c = 1; 
    return getJson();
  }).then(function () {
    let d = 3;
    return getPromise()
  }).then(function () {
     let b = 4;
   return getAsyncConstant(); 
  }).then(() => {
    return 2
  })
}

test()