
function partition(arr, left, right) {
  let pos = left;
  let pivot = arr[left];
  while (left < right) {
    while (left < right && arr[right] >= pivot) right--;
    while (left < right && arr[left] <= pivot) left++;
    [arr[left], arr[right]] = [arr[right], arr[left]];
  }
  [arr[left], arr[pos]] = [arr[pos], arr[left]];
  console.log(left, arr)
  return left;
}

function partition1(arr, left, right) {
  if (left < right) {
    let pos = left - 1;
    let pivot = arr[left];
    for (let i = left; i <= right; i++) {
      if (arr[i] <= pivot) {
        pos++;
        [arr[i], arr[pos]] = [arr[pos], arr[i]];
        // console.log(pos, i, arr)
      }
    }
    [arr[pos], arr[left]] = [arr[left], arr[pos]];
    console.log(pos, arr);
    return pos;
  }
  
}


function partitionThree(arr, left, right) {
  let i = left + 1;
  let gt = right + 1;
  let lt = left;
  let pivot = arr[left];
  while (i < gt) {
    if (arr[i] === pivot) {
      i++;
    } else if (arr[i] < pivot) {
      [arr[i], arr[lt]] = [arr[lt], arr[i]];
      lt++;
      i++;
    } else {
      gt--;
      [arr[i], arr[gt]] = [arr[gt], arr[i]];
    }
  }
  return { lt, gt };
}

var arr = [3, 1, 2, 6, 5, 4];
var arr1 = [3, 4, 5, 6, 2, 1];
var arr2 = [3, 5, 8, 1, 2, 9, 4, 7, 6];
//pos = 0, i = 0 [3, 4, 5, 6, 2, 1]
//pos = 0, i = 4 ==> pos = 1, [3,2,5,6,4,1]
//pos = 1, i = 5 ==> pos = 2, [3,2,1,6,4,5]
//循环结束后的交换：left = 0， pos = 2 ==》 [1,2,3,6,4,5]


// partition1(arr1, 0, arr1.length - 1);

function threeFastWay(arr, L, R) {
  if (L < R) {
    return;
  }
  const { lt, gt } = partitionThree(arr, L, R);
  console.log(lt, gt);
  threeFastWay(arr, L, lt - 1);
  threeFastWay(arr, gt, R);
}

threeFastWay(arr2, 0, arr2.length - 1);
console.log(arr2);