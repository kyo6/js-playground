function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function buildTree(inOrder, postOrder) {
  
  const build = (inOrder) => {
    if(!inOrder || inOrder.length === 0) {
      return null
    }
    // console.log(inOrder);
    let temp = postOrder.pop();
    let root_index = inOrder.indexOf(temp);
    let root = new TreeNode(temp);
    root.right = build(inOrder.slice(root_index+1));
    root.left = build(inOrder.slice(0, root_index));
    return root;
  }

  return build(inOrder)
 
}

const root = buildTree([2,3,4,5,6,8,10],[2,4,3,6,10,8,5]);


function breadthTraversal(node) {
  const nodes = [];
  if (node) {
    //判断二叉树是否为空
    var que = [node]; //将二叉树放入队列
    while (que.length !== 0) {
      //判断队列是否为空
      node = que.shift(); //从队列中取出一个结点
      nodes.push(node.val); //将取出结点的值保存到数组
      if (node.left) que.push(node.left); //如果存在左子树，将左子树放入队列
      if (node.right) que.push(node.right); //如果存在右子树，将右子树放入队列
    }
  }
  console.log(nodes);
}
breadthTraversal(root)
