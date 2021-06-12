function combinationSum(candidates, target) {
  let ans = [],
    res = [];
  const dfs = function (nums, res, target, start) {
    if (target <= 0) {
      if (0 === target) {
        ans.push(res.slice());
      }
      return;
    }
    for (let i = start; i < nums.length; i++) {
      res.push(nums[i]);
      dfs(nums, res, target-nums[i], i);
      res.pop();
    }
  };
  dfs(candidates, res, target, 0);
  console.log(ans);
  return ans;
}

//意味着下一个for循环中的元素选取，要从前一个元素开始，
var combinationSum1 = function (candidates, target) {
  let ans = [];
  let res = [];
  let dfs = (res, target, start) => {
    if (target < 0) {
      return;
    }
    if (target == 0) {
      ans.push(res);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      res.push(candidates[i]);
      dfs(res.slice(), target - candidates[i], i);
      res.pop();
    }
  };
  dfs(res, target, 0);
  console.log(ans);
  return ans;
};

const candidates = [2, 3, 6, 7],
  target = 7;

combinationSum(candidates, target);
