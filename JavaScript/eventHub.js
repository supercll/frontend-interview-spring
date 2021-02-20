class EventHub {
  constructor() {
    this.eventPool = {};
  }
  on(eventName, fn) {
    this.eventPool[eventName] ? null : (this.eventPool[eventName] = []);
    this.eventPool[eventName].push(fn);
  }

  emit(eventName) {
    this.eventPool[eventName] = this.eventPool[eventName].filter(
      (func) => func != null
    );
    this.eventPool[eventName]
      ? this.eventPool[eventName].forEach((func) => func())
      : null;
  }

  off(eventName, fn) {
    // 会引发数组塌陷
    // const index = this.eventPool[eventName].indexOf(fn);
    // this.eventPool[eventName].splice(index, 1);
    // 方法一：
    // this.eventPool[eventName] = this.eventPool[eventName].filter(func => func != fn);
    // 方法二：杜绝数组塌陷
    this.eventPool[eventName] = this.eventPool[eventName].map((func) => {
      if (func === fn) {
        func = null;
      }
      return func;
    });
  }

  once(eventName, onceFn) {
    this.eventPool[eventName] = this.eventPool[eventName].filter((func) => {
      if (func === onceFn) {
        func();
      }
      return func !== onceFn;
    });
  }
}

const eventHub = new EventHub();
function fn1() {
  console.log(1);
}
function fn2() {
  console.log(2);
}
function fn3() {
  console.log(3);
  eventHub.off("init", fn1);
  eventHub.off("init", fn2);
  eventHub.off("init", fn3);
}
function fn4() {
  console.log(4);
}
function fn5() {
  console.log(5);
}
function fn6() {
  console.log(6);
}
eventHub.on("init", fn1);
eventHub.on("init", fn2);
eventHub.on("init", fn3);
eventHub.on("init", fn4);
eventHub.on("init", fn5);
eventHub.on("init", fn6);
console.log("第一次执行事件");
eventHub.emit("init");
console.log("第二次执行事件");
eventHub.emit("init");
console.log("执行once事件");
eventHub.once("init", fn4);
console.log(eventHub.eventPool["init"])
