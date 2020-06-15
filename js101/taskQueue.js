setTimeout(function() {
  console.log(4);
}, 0);

//new Promise在实例化的过程中所执行的代码都是同步进行的，而then中注册的回调才是异步执行的。
new Promise(function(resolve) {
  console.log(1);
  for (var i = 0; i < 10000; i++) {
    i == 9999 && resolve();
  }
  console.log(2);
}).then(function() {
  console.log(5);
});
console.log(3);

/* 插入100000条数据
*/


function bigData() {
  const ul = document.createElement("ul");
  document.body.appendChild(ul);
  const total = 100000;
  const once = 20;
  let index = 0;

  function loop(curTotal,curIndex){
    if(curTotal <= 0){
        return false;
    }
    //每页多少条
    let pageCount = Math.min(curTotal , once);
    window.requestAnimationFrame(function(){
      let fragment = document.createDocumentFragment();
        for(let i = 0; i < pageCount; i++){
          let li = document.createElement('li');
          li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total);
          fragment.appendChild(li)
        }
        ul.appendChild(fragment)
        loop(curTotal - pageCount,curIndex + pageCount)
    })
  }
  loop(total,index);
}





