function CPromise(executor) {
  if (!(executor instanceof Function)) {
    throw new TypeError("executor must be a function");
  }
  this.promiseStatus = "pending";
  this.promiseValue = undefined;
  this.resolveFunc = Function.prototype;
  this.rejectFunc = Function.prototype;
  let _this = this;

  function change(status, value) {
    if (_this.promiseStatus !== "pending") return;
    _this.promiseStatus = status;
    _this.promiseValue = value;

    let timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      const promiseStatus = _this.promiseStatus;
      const promiseValue = _this.promiseValue;
      promiseStatus === "fulfilled"
        ? _this.resolveFunc(promiseValue)
        : _this.rejectFunc(promiseValue);
    });
  }

  try {
    executor(
      function resolve(value) {
        change("fulfilled", value);
      },
      function reject(reason) {
        change("rejected", reason);
      }
    );
  } catch (err) {
    change("rejected", err.message);
  }
}

CPromise.resolve = function (value) {
  return new CPromise((resolve) => {
    resolve(value);
  });
};
CPromise.reject = function (reason) {
  return new CPromise((resolve, reject) => {
    reject(reason);
  });
};

CPromise.prototype.then = function (resolveFunc, rejectFunc) {
  if (!(resolveFunc instanceof Function)) {
    resolveFunc = function (value) {
      return CPromise.resolve(value);
    };
  }
  if (!(rejectFunc instanceof Function)) {
    rejectFunc = function (reason) {
      return CPromise.reject(reason);
    };
  }
  this.resolveFunc = resolveFunc;
  this.rejectFunc = rejectFunc;
  const _this = this;

  return new CPromise((resolve, reject) => {
    _this.resolveFunc = function (value) {
      try {
        const res = resolveFunc(value);
        res instanceof CPromise ? res.then(resolve, reject) : resolve(res);
      } catch (err) {
        res.reject(err.message);
      }
    };
    _this.rejectFunc = function (reason) {
      try {
        const res = rejectFunc(reason);
        res instanceof CPromise ? res.then(resolve, reject) : resolve(res);
      } catch (err) {
        res.reject(err.message);
      }
    };
  });
};

CPromise.prototype.catch = function (rejectFunc) {
  return this.then(null, rejectFunc);
};

CPromise.all = function (promiseArray) {
  let index = 0,
    values = [];

  return new CPromise((resolve, reject) => {
    for (let i = 0; i < promiseArray.length; i++) {
      let item = promiseArray[i];
      item instanceof CPromise ? null : (item = CPromise.resolve(item));
      item
        .then((value) => {
          index++;
          values[i] = value;
          if (index === promiseArray.length) {
            resolve(values);
          }
        })
        .catch((reason) => {
          reject(reason);
        });
    }
  });
};

// 先调用原生promise
const p = new CPromise((resolve, reject) => {
  resolve(1);
  reject(2);
});
// // 初始化状态
// console.log(p);
// // resolve,reject静态方法
// console.log(CPromise.resolve(1));
// console.log(CPromise.reject(2));
// // then
// p.then(
//   (res) => {
//     console.log("ok", res);
//   },
//   (reason) => {
//     console.log("fail", reason);
//   }
// );
// // 链式调用
// p.then(
//   (res) => {
//     console.log("ok", res);
//   },
//   (reason) => {
//     console.log("fail", reason);
//     return CPromise.reject(3);
//   }
// ).then(
//   (value) => {
//     console.log("ok", value);
//   },
//   (reason) => {
//     console.log("fail", reason);
//   }
// );
// // 状态顺延
// p.then((res) => {
//   console.log("ok1", res);
// }).then(null, (reason) => {
//   console.log("fail2", reason);
// });
// p.then(null, (reason) => {
//   console.log("fail1", reason);
// }).then((value) => {
//   console.log("ok2", value);
// });

// // catch
// p.then((res) => {
//   console.log(res);
// }).catch((reason) => {
//   console.log(reason);
// });

// promise.all，并发请求，串行请求
function asyncFunc1() {
  return new CPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}
function asyncFunc2() {
  return new CPromise((resolve, reject) => {
    setTimeout(() => {
      reject(2);
    }, 2000);
  });
}
function asyncFunc3() {
  return new CPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 3000);
  });
}
CPromise.all([asyncFunc1(), asyncFunc2(), asyncFunc3()]).then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);
CPromise.all([asyncFunc1(), asyncFunc3()]).then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);
