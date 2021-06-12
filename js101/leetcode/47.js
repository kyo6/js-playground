// 全排列II
function permuteUnique(nums) {
  let p = [];
  let pb = [];
  let ans = [];
  const dfs = (p, pb, res) => {
    if (res.length === nums.length) {
      ans.push(res.slice());
      return
    }
    for (let i = 0; i < p.length; i++){
      let c = p[i];
      if (pb[i] > 0) {
        res.push(c);
        pb[i]--;
        dfs(p, pb, res);
        pb[i]++;
        res.pop()
      }
    }
  };
  let map = new Map();  
  for (let v of nums) {
    if (map.has(v)) {
      map.set(v, map.get(v) + 1)
    } else {
      map.set(v, 1)
    }
  }
  for (let [key, value] of map.entries()) {
    p.push(key);
    pb.push(value);
  }
  dfs(p, pb, []);
  console.log(ans)
  return ans;
}

const nums = [1, 1, 2];
permuteUnique(nums)