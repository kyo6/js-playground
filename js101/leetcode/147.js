const {print, buildList, ListNode, } = require('./utils/listNode')

var insertionSortList = function(head) {
  var dummy = new ListNode(0);
  var pre = dummy;
  while(head) {
    var cur = head;
    head = head.next;
    if(cur.val < pre.val) {
      pre = dummy;
    }
    while(pre.next !== null && cur.val > pre.next.val){
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
