function quickSort(arr, left, right) {
  //print(arr)          //这个left和right代表分区后“新数组”的区间下标，因为这里没有新开数组，所以需要left/right来确认新数组的位置
  if (left < right) {
      let pos = left - 1                      //pos即“被置换的位置”，第一趟为-1
      for(let i = left; i <= right; i++) {    //循环遍历数组，置换元素
          let pivot = arr[right]              //选取数组最后一位作为基准数，
          if(arr[i] <= pivot) {               //若小于等于基准数，pos++，并置换元素, 这里使用小于等于而不是小于, 其实是为了避免因为重复数据而进入死循环
              pos++;
              //交换两个元素的位置
              [arr[pos], arr[i]] = [arr[i], arr[pos]];
          }
      }
      //一趟排序完成后，pos位置即基准数的位置，以pos的位置分割数组
      console.log(pos)
      quickSort(arr, left, pos - 1)        
      quickSort(arr, pos + 1, right)
  }
  return arr;
}
function print(arr = []) {
  console.log(arr.join(','))
}

function print1(arr = [], start, end) {
  if(start < end) {
    const a = arr.slice(start, end);
    console.log(a.join(',')) 
  }
}
var arr = [2, 5, 3, 1, 10, 4]
var start = 0;
var end = arr.length - 1;
//quickSort(arr, start, end)

var arr1 = [1,1,1,1,1,1];
var arr2 = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]
var arr3 = [28,4,47,84,12,47,88,63]
// quickSort(arr2, start, end)

// 从左往右排
function quickSort1(arr, left, right) {
  if(left < right) {
    let pos = left - 1;
    const povit = arr[left];
    for(let i = left; i <= right; i++) {
      if(arr[i] <= povit) {
        ++pos;
        [arr[pos], arr[i]] = [arr[i], arr[pos]]
      }
    }
    [arr[pos], arr[left]] = [arr[left], arr[pos]];
    console.log(arr);
    quickSort1(arr, left, pos-1);
    quickSort1(arr, pos+1, right)
  }
  // console.log(arr)
  return arr;
}

function partition(arr, beg, end) {
  if(beg === end) {
    return beg;
  }
  let left = beg, right = end;
  const pivot = arr[beg];
  while(left < right) {
    while(arr[right] >= pivot && left < right){
      right--;
    }
    while(arr[left] <= pivot && left < right){
      left++;
    }
    [arr[left], arr[right]] = [arr[right], arr[left]]
  }
  [arr[beg], arr[left]] = [arr[left], arr[beg]]
  // console.log(arr);
  return left; 
}

function partitionPlus(arr, L, R) {
   // 基准值为数组的零号元素
   let p = arr[L];
   // 左区间的初始值: L
   let lt = L;
   // 右区间的初始值: R
   let gt = R + 1;
  for(let i = L + 1; i < gt;) {
    if(arr[i] === p) {
      i++;
    } else if(arr[i] > p) {
      [arr[gt-1 ],arr[i]] = [arr[i],arr[gt-1]];
      gt--;
    }else {
      [arr[lt + 1],arr[i]] = [arr[i],arr[lt + 1]];
      lt++;
      i++;
    }
  }
  // i走向gt处，除了基准值外的元素，其余的空间已经分区完毕，交换基准值与lt处的元素，lt-1，
  // 最终得到我们需要的三个区间
  [arr[L],arr[lt]] = [arr[lt],arr[L]];
  lt--;
  console.log(`三路快排后的数组: ${arr}`);
  return {lt : lt, gt : gt};
} 
const dataArr = [3,5,8,1,2,9,4,7,6];
console.log(partitionPlus(dataArr,0,dataArr.length - 1));


const threeWayFastRow = function (arr,L,R) {
  // 当前数组的起始位置大于等于数组的末尾位置时退出递归
  if(L >= R){
      return false;
  }
  let obj = partition(arr, L, R);
  // 递归执行: 将没有大于p,和小于p区间的元素在进行三路快排
  threeWayFastRow(arr,L,obj.lt);
  threeWayFastRow(arr,obj.gt,R);
}

function quickSort2(arr, left, right) {
  if(left >= right) {
    return
  }
  const pos = partition(arr, left, right);
  quickSort2(arr, left, pos-1);
  quickSort2(arr, pos+1, right)
}

quickSort2(arr3, 0, arr3.length-1)

function mergeSort(arr) {
  if(Array.isArray(arr) && arr.length <= 1) return arr;
  const mid = arr.length / 2 | 0;
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid, arr.length);
  console.log(leftArr, rightArr);
  return merge(mergeSort(leftArr), mergeSort(rightArr))
}

function merge(left, right) {
  console.log(left, right);
  const result = [];
  while(left.length  && right.length) {
    if(left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  if(left.length > 0) {
    result.concat(left)
  } else if(right.length > 0) {
    result.concat(right)
  }
}

//mergeSort(arr2)
