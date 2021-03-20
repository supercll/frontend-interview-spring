// 快速排序
/* 
原理：分治
1. 取数组的中间值为标杆，然后对比标杆大小拆分为两个数组
2. 递归快排这两个数组，这就是分治
3. 结果一定是n个排序完成的数组，将这些数组合并
*/
Array.prototype.quickSort = function quickSort() {
  if (this.length <= 1) return this;
  const midIndex = Math.floor(this.length / 2);
  const midVal = this.splice(midIndex, 1)[0];

  const left = [],
    right = [];
  for (let i = 0; i < this.length; i++) {
    const item = this[i];
    item < midVal ? left.push(item) : right.push(item);
  }
  return quickSort.call(left).concat(midVal, quickSort.call(right));
};
/* 
归并排序
原理：分治
1. 与快排不同的是，快排是在分的时候排序，而归并排序是在归的时候排序
*/

Array.prototype.mergeSort = function () {
  function merge(left, right) {
    let result = [];
    while (left.length > 0 && right.length > 0) {
      left[0] <= right[0] ? result.push(left.shift()) : result.push(right.shift());
    }

    while (left.length > 0) {
      result.push(left.shift());
    }

    while (right.length > 0) {
      result.push(right.shift());
    }
    return result;
  }
  function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    let midIndex = Math.floor(arr.length / 2);
    let left = arr.slice(0, midIndex);
    let right = arr.slice(midIndex);
    return merge(mergeSort(left), mergeSort(right));
  }
  return mergeSort(this);
};
let arr = [1, 7, 2, 6, 0, 999];

console.log(arr.quickSort());
console.log(arr.mergeSort());
