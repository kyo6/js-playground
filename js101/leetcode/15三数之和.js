function threeSum(nums) {
  let ans = [];
  if (nums.length < 3) {
    return [];
  }
  
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > 0) {
      return false;
    }
    if (i > 0 && a[i] === a[i - 1]) {
      continue;
    }
    let L = i + 1;
    let R = nums.length - 1;
    while (L < R) {
      let sum = nums[i] + nums[L] + nums[R];
      if (sum === 0) {
        ans.push([nums[i], nums[L], nums[R]]);
        while (L < R && nums[L] === nums[L + 1]) {
          L++;
        }
        while (L < R && nums[R] === nums[R - 1]) {
          R--;
        }
      } else if (sum < 0) {
        L++;
      } else {
        R--;
      }
    }
  }
  return ans;
}
