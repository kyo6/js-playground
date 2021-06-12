/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}


function partition(nums, low, high){
	let pivot = randomIntInRange(low, high), i = low;
	swap(nums, pivot, high);
	for (let j = low; j < high; j++) {
      if (nums[j] <= nums[high]) {
        swap(nums, i++, j);
      }
  }
  swap(nums, i, high);
  return i;
}


function Range(low, high) {
	this.low = low;
	this.high = high;
}


function quickSort(nums) {
	let stack = [];
	let range = new Range(0, nums.length - 1);
  stack.push(range);
	while(stack.length) {
		range = stack.pop();
		let index = partition(nums, range.low, range.high);
		if(index - 1 > range.low) {
			stack.push(new Range(range.low, index - 1))
		}
		if(index + 1 < range.high) {
			stack.push(new Range(index + 1, range.high)
		}
	}
}