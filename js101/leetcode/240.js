/**
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：
 * 每行的元素从左到右升序排列。
 * 每列的元素从上到下升序排列。
 * @param {*} matrix
 */

/**

解题思路：参照Two Sum II（167） 问题那样，一次削减一行或者一列。类比刚才的双指针解法，我们可以检查矩阵右上角的元素，

*/

// 查找问题,利用数组有序性可以降低时间复杂度
function searchMatrix(matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }
}
