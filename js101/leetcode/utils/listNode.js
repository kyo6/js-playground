function ListNode(val) {
  this.val = val;
  this.next = null;
}

function buildList(arr){
  if(Array.isArray(arr)) {
    let head, tail;
    for(let v of arr) {
      if(!head) {
        head = new ListNode(v);
        tail = head
      } else {
        tail.next = new ListNode(v);
        tail = tail.next
      }
    }
    return head
  }
  return null;
}

function print(head) {
  if(head) {
    let arr = [];
    while(head) {
      arr.push(head.val);
      head=head.next;
    }
    console.log(arr)
  }
}

module.exports = {
  ListNode,
  buildList,
  print
}
