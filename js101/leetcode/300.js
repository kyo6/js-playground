function lengthOfLIS(nums) {
  let top = Array.from({ length: nums.length }, () => 0);
  // 牌堆数初始化
  let piles = 0;
  for (let i = 0; i < nums.length; i++) {
    let poker = nums[i];
    let left = 0; right = piles;
    while (left < right) {
      let mid = (right + left) >> 1;
      console.log(top[mid])
      if (top[mid] > poker) {
        right = mid;
      } else if (top[mid] < poker) {
        left = mid + 1;
      } else {
        right = mid
      }
    }
    if (left === piles) {
      piles ++
    }
    top[left] = poker
  }
  console.log(top, piles)
  return piles;
}

let arr = [10, 9, 2, 5, 3, 7, 101, 18]
lengthOfLIS(arr)
