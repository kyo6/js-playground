/**
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：
 * 每行的元素从左到右升序排列。
 * 每列的元素从上到下升序排列。
 * @param {*} matrix
 */

// 查找问题,利用数组有序性可以降低时间复杂度
function searchMatrix(matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }
}
