function findDuplicate(nums) {
  if (nums.length < 0) {
    return null
  }
  let left = 1, right = nums.length - 1;
  while (left < right) {
    let mid = (left + right) >> 1;
    let count = 0;
    for (v of nums) {
      if (v <= mid) {
        count ++
      }
    }
    if (count > mid) {
      right = mid;
    } else {
      left = mid + 1
    }
  }
  return left;
}

let nums = [1, 2, 3, 4, 1, 5]
findDuplicate(nums);