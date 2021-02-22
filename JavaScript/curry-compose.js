// 柯里化函数
// 思想，利用闭包的保存机制，将多个参数存储起来，满足一定数量后执行

const curry = (func) => {
  let params = [];

  return function _curry(...args) {
    params = args.concat(params);
    if (params.length === func.length) {
      const res = func(...params);
      params = [];
      return res;
    } else {
      return _curry;
    }
  };
};

function add(a, b, c) {
  console.log(a + b + c);
}
curry(add)(1);
curry(add)(1, 2);
curry(add)(1, 2, 3);

// compose 组合函数
// 利用闭包的保存机制，将上一个函数的返回值作为下一个函数的参数执行，类似于js的管道操作符

const compose = (...funcs) => {
  return function (...args) {
    const n = funcs.length;
    if (n === 0) return args;
    if (n === 1) return funcs[0](...args);

    return funcs.reduce((res, fn) => {
      return res instanceof Array ? fn(...res) : fn(res);
    }, args);
  };
};

const fn1 = (x) => x + 10;
const fn2 = (x) => x - 10;
const fn3 = (x) => x * 10;

const res = compose(fn1, fn2, fn3)(10);
console.log(res);
