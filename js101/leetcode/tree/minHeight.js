//求二叉树的最小高度
/** 
        A
       / \
      B   C
       \   \
        D   E
       /
      F 
*/

// recursive
function getMinDepth(node) {
  if (node === null) {
    return 0
  }
  if (node.left === null && node.right === null) {
    return 1
  }
  let leftHeight = getMinDepth(node.left);
  let rightHeight = getMinDepth(node.right);
  if (node.left === null || node.right === null) {
    return  leftHeight + rightHeight + 1
  }
  return Math.min(leftHeight, rightHeight) + 1
}

// BFS
function minDepth(root) {
  if (root === null) {
    return 0
  }
  let queue = [];
  queue.push(root);
  let depth = 1;
  while (queue.length) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let cur = queue.shift();
      if (cur.left === null && cur.right === null) {
        return depth
      }
      if (cur.left) {
        queue.push(cur.left);
      }
      if (cur.right) {
        queue.push(cur.right)
      }
    }
    depth++
  }
  return depth
}

/**
 思考：为什么 BFS 可以找到最短距离，DFS 不行吗？

 首先，你看 BFS 的逻辑， depth 每增加一次，队列中的所有节点都向前迈一步，
 这保证了第一次到达终点的时候，走的步数是最少的。
 
 DFS 不能找最短路径吗?其实也是可以的，但是时间复杂度相对高很多。 
 你想啊，DFS 实际上是靠递归的堆栈记录走过的路径，你要找到最短路径，肯定得把二叉树
 中所有树杈都探索完才能对比出最短的路径有多⻓对不对?
 
 而 BFS 借助队列做到一次一步「⻬头并进」，是可以在不遍历完整棵树的条件下找到最短距离的。
 */ 