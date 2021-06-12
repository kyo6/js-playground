// 无序数组中的第K大元素,var arr = [3,2,1,5,6,4];

// 解法1：小顶堆法
// 维护一个容量为k的小顶堆，堆中的k个节点代表着当前最大的k个元素，而堆顶显然是这k个元素的最小值。

var findKthLargest = function (nums, k) {
  if (k < 0) {
    return -1;
  }
  buildHeap(nums, k);
  for (let i = k; i < nums.length; i++) {
    if (nums[i] > nums[0]) {
      nums[0] = nums[i];
      downAdjust(nums, 0, k);
    }
  }
  return nums[0];
};

var buildHeap = function (nums, k) {
  let last_child = k - 1;
  let parent = (last_child - 1) >> 1;
  for (let i = parent; i >= 0; i--) {
    downAdjust(nums, i, k);
  }
};

var downAdjust = function (nums, i, length) {
  for (let j = 2 * i + 1; j < length; j = 2*j + 1) {
    let temp = nums[i];
    if (j + 1 < length && nums[j + 1] < nums[j]) {
      j++;
    }
    if (temp > nums[j]) {
      swap(nums, i, j);
      i = j;
    } else {
      break;
    }
  }
};

var swap = function (array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};