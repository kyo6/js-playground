const target = {
  filed1: 1,
  filed2: undefined,
  filed3: {
    child: "child",
  },
  field4: [2, 4, 8],
  [Symbol()]: 12345678,
  symbol: Symbol("123"),
  empty: null,
  set: new Set().add("a").add("b"),
  map: new Map().set("age", 18).set("city", "sh"),
  age: 18,
  bool: new Boolean(true),
  date: new Date(),
  print: () => {}
};
target.target = target;

const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]'

const deepTag = [mapTag, setTag, arrayTag, objectTag]

function isObject(obj) {
  return typeof obj === 'function' && obj !== null
}
function getType(target) {
  return Object.prototype.toString.call(target);
}

function getConstructor(target) {
  if (target.hasOwnProperty('constructor')) {
    const constructor = target.constructor;
    return new constructor()
  }
}

function clone(obj, map = new WeakMap()) {
  if (!isObject(obj)) {
    return obj;
  }
  const type = getType(obj);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getConstructor()
  } else {
    return console.log(type, obj)
  }
  if (map.has(target)) {
    return map.get(target)
  }
   map.set(target, cloneTarget);
  if (type === setTag) {
    obj.forEeach(val => {
     cloneTarget.add(clone(val)) 
    })
    return cloneTarget
  }
  if (type === mapTag) {
    obj.forEach((value, key) => {
      cloneTarget.set(key, clone(value));
    });
    return cloneTarget;
  }

  //const keys = type === arrayTag ? undefined : Reflect.ownKeys(obj);
  for (const k in obj) {
    cloneTarget[k] = clone(obj[k], map);
  }
  return cloneTarget
}

const result = clone(target);
console.log(result);