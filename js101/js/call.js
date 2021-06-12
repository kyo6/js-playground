const obj = {
  name:'Alex'
}

function foo(age) {
  console.log(this.name+' '+age)
}

var name = "apple"

Function.prototype.myCall = function (obj, ...args) {
  const fn = Symbol('fn')
  obj = obj || window
  obj[fn] = this;
  const result = obj[fn](...args);
  delete obj[fn];
  return result
}

foo.myCall(obj,18)
