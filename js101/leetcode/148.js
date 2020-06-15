const {ListNode, buildList, print} = require('./utils/listNode')

function split(head) {
  let fast = head;
  let slow = head;
  let prev = null;
  while(fast !== null && fast.next !== null) {
		fast = fast.next.next;
    prev = slow;
    slow = slow.next
  }
  if(prev) {
    prev.next = null; // 将链表断开
  } 
  return slow;
}


function sortedListNode(head) {
  if(head === null || head.next === null) {
    return head;
  }
  const mid = split(head);
  let left = sortedListNode(head);
  let right = sortedListNode(mid);
  return merge(left, right)
}

function merge(l1, l2) {
  let dummy = new ListNode(0);
  let cur = dummy;
  while(l1 && l2) {
    if(l1.val < l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next
    }
    cur = cur.next
  }
  cur.next = l1 || l2;
  return dummy.next;
}


const head = buildList([4,2,5,1,3])
const sortHead = sortedListNode(head);

print(sortHead)
