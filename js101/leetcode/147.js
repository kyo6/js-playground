const {print, buildList, ListNode, } = require('./utils/listNode')

var insertionSortList = function(head) {
  var dummy = new ListNode(0);
  var pre = dummy;
  while(head) {
    var cur = head;
    head = head.next;
    // 当cur 小于 pre 时需要重新从堆头开始查找插入位置
    if(cur.val < pre.val) {
      pre = dummy;
    }
    // 寻找cur的插入位置
    while(pre.next !== null && pre.next.val < cur.val){
      pre = pre.next;
    }
    cur.next = pre.next;
    pre.next = cur;
    // print(dummy.next);
  }
  return dummy.next;
};

let arr = [2,5,1,8];
let head = buildList(arr);
print(head)
const sortHead = insertionSortList(head);
print(sortHead)
