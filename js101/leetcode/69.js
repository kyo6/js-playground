var mySqrt = function (x) {
  let left = 1;
  let right = (x >> 1) + 1;
  while (left <= right) {
    // middle 怎么确定的
    let middle = left + ((right - left) >> 1);
    let square = middle * middle;

    if (square == x) {
      return middle;
    } else if (square > x) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }
  return right;
};
const ans = mySqrt(9)
console.log(ans);