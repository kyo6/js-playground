var lengthOfLIS = function (nums) {
  if (Array.isArray(nums)) {
    let len = nums.length;
    if (len === 0) {
      return 0
    }
    let dp = Array.from({ length: len }, () => 1)
    // 核心是找出递推关系式子
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < i; j++) {
        if (nums[i] > nums[j]) {
          dp[i] = Math.max(dp[i], dp[j] + 1)
        }
      }
    }
    return Math.max(...dp)
  }
  return 0
}

const nums = [10, 9, 2, 5, 3, 7, 101, 18]
lengthOfLIS(nums)