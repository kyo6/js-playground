let triangle = [
  [2],
 [3,4],
[6,5,7],
[4,1,8,3]
]

var minimumTotal = function(triangle) {
  if(Array.isArray(triangle)) {
     let row = triangle.length -1;
     let map = new Map();
     const traversal = (i, j) => {
       if(i >= row)  {
         return 0;
       }
       let key = `${i}-${j}`;
       if(map.has(key)) {
         return map.get(key)
       }
       let leftSum = traversal(i+1,j) + triangle[i+1][j];
       let rightSum = traversal(i+1,j+1) + triangle[i+1][j+1];
       let result = Math.min(leftSum, rightSum);
       map.set(key, result);
       return result;
     }
     let sum = traversal(0,0) + triangle[0][0];
     console.log(sum);
     return sum;
  }
  return 0
};
minimumTotal(triangle)
