const { ListNode, buildList, print } = require("./utils/listNode");

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    let node = new Node(val, priority);
    this.values.push(node);
    this.bubbleUp();
  }

  dequeue() {
    let max = this.values[0];
    let end = this.values.pop();
    if (this.values.length) {
      this.values[0] = end;
      this.bubbleDown();
    }
    return max.val;
  }

  isEmpty() {
    return !this.values.length;
  }

  bubbleUp(index = this.values.length - 1) {
    if (index <= 0) return;
    let parentIndex = Math.floor((index - 1) / 2);
    if (this.values[index].priority <= this.values[parentIndex].priority) {
      [this.values[index], this.values[parentIndex]] = [
        this.values[parentIndex],
        this.values[index],
      ];
      this.bubbleUp(parentIndex);
    }
  }

  bubbleDown(index = 0, swapIndex = null) {
    let leftIndex = index * 2 + 1,
      rightIndex = index * 2 + 2,
      length = this.values.length;

    if (leftIndex < length) {
      if (this.values[leftIndex].priority <= this.values[index].priority) {
        swapIndex = leftIndex;
      }
    }

    if (rightIndex < length) {
      if (
        (swapIndex === null &&
          this.values[rightIndex].priority <= this.values[index].priority) ||
        (swapIndex !== null &&
          this.values[rightIndex].priority <= this.values[leftIndex].priority)
      ) {
        swapIndex = rightIndex;
      }
    }

    if (swapIndex !== null) {
      [this.values[index], this.values[swapIndex]] = [
        this.values[swapIndex],
        this.values[index],
      ];
      this.bubbleDown(swapIndex, null);
    }
  }
}

var mergeKLists = function(lists) {
    let queue = new PriorityQueue();
    lists.forEach(list => {
        if(list) queue.enqueue(list, list.val)
    });
  
    // console.log(queue)

    let dummy = new ListNode(-1);
    let cur = dummy;
    while(!queue.isEmpty()) {
        cur.next = queue.dequeue();
        cur = cur.next;
        if(cur.next) queue.enqueue(cur.next, cur.next.val);
    }
    return dummy.next;
}

let l1 = buildList([1, 4, 5]);
let l2 = buildList([1, 3, 4]);
let l3 = buildList([2, 6]);

let lists = [l1, l2, l3];
let head = mergeKLists(lists);
console.log(head)
print(head)