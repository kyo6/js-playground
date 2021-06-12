//冒泡排序算法的核心在于每次通过两两比较交换位置，
// 选出剩余无序序列里最大（小）的数据元素放到队尾。

const arr = [2, 5, 3, 1, 10, 4];


function bubbleSort1(arr) {
  let temp = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
}

function bubbleSort2(arr) {
  let temp = 0;
  for (let i = 0; i < arr.length - 1; i++) {
			for (let j = 0; j < arr.length - 1 - i; j++) {
				if (arr[j] > arr[j + 1]) {
					temp = arr[j];
					arr[j] = arr[j + 1];
					arr[j + 1] = temp;
				}
			}
		} 
}


function bubbleSort(arr) {
  if(!Array.isArray(arr)) {
    return arr
  }
  for(let i = 0; i < arr.length; i++) {
    let flag = true
    for(j=0; j < i; j++) {
      if(arr[i] < arr[j]) {
        flag= false;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    if(flag) break;
  }
  console.log(arr);
  return arr;
}

bubbleSort(arr)
