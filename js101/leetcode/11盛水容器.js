//  Container With Most Water
/**
 
 */
var maxArea = function (height) {
  let max = 0;
  let left = 0, right = height.length - 1;
  while (left < right) {
    let currentArea = (right - left) * Math.min(height[left], height[right]);
    console.log(currentArea);
    max = Math.max(currentArea, max);
    if (height[left] > height[right]) {
      right--;
    } else {
      left++;
    }
  }
  return max;
};

let nums = [1, 8, 6, 2, 5, 4, 8, 3, 7];

console.log(maxArea(nums));