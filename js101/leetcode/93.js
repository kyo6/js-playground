var restoreIpAddresses = function (s) {
  var ans = [], res = [];
  var dfs = function (s, index, level, res) {
    // 递归结束条件
    if (level === 5 || index === s.length - 1) {
      if (level === 5 && index === s.length - 1) {
        ans.push(res.join("."));
      }
      return;
    }
    // 候选人,一次可以选1位数，2位数，3位数
    for (let i = 1; i < 4; i++) {
      let x = s.substr(index + 1, i);
      //筛选
      if (parseInt(x) < 256 && (x == "0" || !x.startsWith("0"))) {
        res.push(x);
        dfs(s, index + i, level + 1, res);
        res.pop();
      }
    }
  };
  dfs(s, -1, 1, res);
  console.log(ans);
  return ans;
};

// 46
var permute = function (str) {
  var ans = [],
    res = [];
  var dfs = function (str, res) {
    if (res.length === str.length) {
      ans.push(res.join(""));
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
let ip = "25525511135";
let ip2 = "192168023";
let letter = ['a','b','c','d'];
qu(letter);
// restoreIpAddresses(ip2);
