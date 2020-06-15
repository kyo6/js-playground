function binarySearch(arr, target) {
  if(!Array.isArray(arr) || arr.length === 0) {
    return -1;
  }
  let left = 0; right = arr.length - 1;
  while(left <= right) {
    let mid = left + (right - left) / 2 | 0;
    if(arr[mid] === target) {
      return mid;
    } else if(arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1
}

// const find = binarySearch(nums, 2)
// console.log(find);

function left_bound(nums, target) {
  if (nums.length === 0) {
    return -1
  }
  let left = 0, right = nums.length; //注意
  while (left < right) {
    let mid = left + parseInt((right - left) / 2);
    if (nums[mid] === target) {
      right = mid
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[i] > target) {
      right = mid
    }
  }
  console.log(left);
  // target 比所有数都大
  if (left == nums.length) return -1;
  // 类似之前算法的处理方式
  return nums[left] == target ? left : -1;
}

const nums = [2, 5, 3, 7], target = 9;
left_bound(nums, target);