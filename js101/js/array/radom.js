// js 洗牌算法
function order(arr) {
 let cloneArray = arr.concat();
 let len = cloneArray.length;
 for(let i = 0; i < len; i++) {
   let index = Math.floor(Math.random() * cloneArray.length);
   [cloneArray[i], cloneArray[index]] = [cloneArray[index], cloneArray[i]]
 }
 return cloneArray 
}

let arr = [1,2,3,4,5]

console.log(order(arr))
