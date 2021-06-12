// sum(1,2,3,4..n)转化为 sum(1)(2)(3)(4)…(n)
function curry(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args);
  }
  return (...args1) => curry(fn, ...args, ...args1);
}
function sum(a,b,c) {
 return a + b + c
}

const add = curry(sum)(1)(2)(3);

