const { ListNode, buildList, print } = require("./utils/listNode");

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

function PriorityQueue() {
  // 方便计算，将第一位置空
  this.list = [{}];
}

PriorityQueue.prototype.size = function () {
  return this.list.length - 1;
};

PriorityQueue.prototype.empty = function () {
  return this.list.length === 1;
};

PriorityQueue.prototype.push = function (data, priority) {
  const node = new Node(data, priority)
  this.list.push(node);
  console.log(node, this.list);
  this._moveUp();
};

//  PriorityQueue.prototype._moveUp = function () {
//   let last_node = this.lists.length - 1;
//    let parent = Math.floor((last_node - 1) / 2);
//    let isChange = true;
//    while (isChange) {
//      isChange = false;
//      let temp = this.list[parent];
//      if (temp > this.list[last_node]) {

//      }

//    }
//  }

// 小根堆，父节点>子节点时，父子节点进行交换
PriorityQueue.prototype._moveUp = function () {
  let newPos = this.list.length - 1;
  let parent = Math.floor(newPos / 2);
  let isChange = true;
  while (isChange) {
    isChange = false;
    //父子结点比较
    if (this.list[parent].priority > this.list[newPos].priority) {
      let temp = this.list[parent];
      this.list[parent] = this.list[newPos];
      this.list[newPos] = temp;
      isChange = true;
      newPos = parent;
      parent = Math.floor(newPos / 2);
    }
  }
};

// 向下调整
PriorityQueue.prototype._moveDown = function () {
  let newPos = 1;
  let isChange = true;
  while (isChange) {
    isChange = false;
    //父子结点比较
    let leftSonPos = newPos * 2;
    let rightSonPos = newPos * 2 + 1;
    let leftSonVal = this.list[leftSonPos];
    let rightSonVal = this.list[rightSonPos];

    if (typeof leftSonVal === "undefined" && typeof rightSonVal) break;

    let pos;
    // 要注意有结点不存在的情况
    if (
      typeof leftSonVal !== "undefined" &&
      typeof rightSonVal === "undefined"
    ) {
      pos = leftSonVal.priority < this.list[newPos].priority ? leftSonPos : newPos;
    } else if (
      typeof leftSonVal === "undefined" &&
      typeof rightSonVal !== "undefined"
    ) {
      pos = rightSonVal.priority < this.list[newPos].priority ? rightSonPos : newPos;
    } else {
      pos = leftSonVal.priority < rightSonVal.priority ? leftSonPos : rightSonPos;
      pos = this.list[newPos].priority < this.list[pos].priority ? newPos : pos;
    }

    if (pos === newPos) break;
    let temp = this.list[pos];
    this.list[pos] = this.list[newPos];
    this.list[newPos] = temp;
    isChange = true;
    newPos = pos;
  }
};

PriorityQueue.prototype.pop = function () {
  let res = this.top();
  this.list[1] = this.list[this.list.length - 1];
  this.list.splice(this.list.length - 1, 1);
  this._moveDown();
  return res.val;
};

PriorityQueue.prototype.top = function () {
  return this.list[1];
};

PriorityQueue.prototype.back = function () {
  return this.list[this.list.length - 1];
};

function mergeKLists(lists) {
  if (lists == null || lists.length == 0) {
    return null;
  }
  //创建一个堆，并设置元素的排序方式
  let queue = new PriorityQueue();
  //遍历链表数组，然后将每个链表的每个节点都放入堆中
  for (let i = 0; i < lists.length; i++) {
    while (lists[i] != null) {
      queue.push(lists[i], lists[i].val);
      lists[i] = lists[i].next;
    }
  }
  const dummy = new ListNode(-1);
  let head = dummy;
  //从堆中不断取出元素，并将取出的元素串联起来
  while (!queue.empty()) {
    const node = queue.pop();
    console.log('node',node);
    dummy.next = node;
    dummy = dummy.next;
  }
  dummy.next = null;
  return head.next;
}

let l1 = buildList([1, 4, 5]);
let l2 = buildList([1, 3, 4]);
let l3 = buildList([2, 6]);

let lists = [l1, l2, l3];

const head = mergeKLists(lists);
print(head);
