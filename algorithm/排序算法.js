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
let arr = [1, 7, 2, 6, 0, 999];

console.log(arr.quickSort());
