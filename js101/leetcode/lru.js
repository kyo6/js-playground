function ListNode(key, val) {
  this.key = key // 存key
  this.val = val // 存val
  this.next = null
  this.prev = null
}


function LRUCache(capacity) {
  this.capacity = capacity;
  this.hashTable = {};
  this.count = 0;
  this.dummyHead = new ListNode();
  this.dummyTail = new ListNode();
  this.dummyHead.next = this.dummyTail;
  this.dummyTail.prev = this.dummyHead;
}


LRUCache.prototype.moveToHead = function (node) {
  this.removeFromList(node);
  this.addToHead(node);
}


LRUCache.prototype.removeFromList = function (node) {
  let prev = node.prev;
  let next = node.next;
  prev.next = next;
  next.prev = prev;
}

LRUCache.prototype.addToHead = function (node) {
  let next = this.dummyHead.next;
  this.dummyHead.next = node;
  node.prev = this.dummyHead;
  node.next = next;
  next.prev = node;
}

LRUCache.prototype.removeLRUItem = function () {
  let tail = this.popTail();
  delete this.hashTable[tail.key]
  this.count-- 
}

LRUCache.prototype.popTail = function() {
  let tailItem = this.dummyTail.prev;
  this.removeFromList(tailItem);
  return tailItem;
}

/**
 * 1.写入新数据，创建新节点，添加到链表头部（被淘汰的优先级最低），并存入哈希表，
 * 检查是否超容，决定是否移除“老家伙”
 * 
 * 2.写入已有的数据，则更新数据值，刷新节点的位置
 */
LRUCache.prototype.put = function (key, val) {
  let node = this.hashTable[key];
  if (node) {
    node.val = val;
    this.moveToHead(node)
  } else {
    let newNode = new ListNode(key, val);
    this.hashTable[key] = newNode;
    this.addToHead(newNode);
    this.count++;
    if (this.count > this.capacity) {
      this.removeLRUItem()
    }
  }
}

/**
 * 1.哈希表中没有对应的值，就直接返回-1
 * 2.被读取的节点，要刷新它的位置，移动到链表的头部
 */
LRUCache.prototype.get = function (key) {
  let node = this.hashTable[key];
  if (!node) {
    return -1
  }
  this.moveToHead(node);
  return node.val
}


const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);
cache.put(3, 3);
cache.get(2);
cache.put(4, 4);
cache.get(1);
cache.get(3);
cache.get(4);
console.log(cache)