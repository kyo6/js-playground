// 56. 合并区间
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  const ans = [];
  intervals.sort((a,b) => a[0] - b[0]);
  let previous;
  for(current of intervals) {
    if(!previous || current[0] > previous[1]) {
      ans.push(current);
      previous = current
    } else {
      previous[1] = Math.max(previous[1], current[1])
    }
  }
  return ans;
};