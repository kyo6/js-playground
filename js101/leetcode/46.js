// 46
var permute = function (str) {
  var ans = [],
    res = [];
  var dfs = function (str, res) {
    if (res.length === str.length) {
      ans.push(res.slice());
      return;
    }
    for (let i = 0; i < str.length; i++) {
      let c = str[i];
      if (c != null) {
        res.push(c);
        str[i] = null;
        dfs(str, res);
        str[i] = c;
        res.pop();
      }
    }
  };
  dfs(str, res);
  console.log(ans);
  return ans;
};

let letter = [1, 1, 2];
permute(letter);

