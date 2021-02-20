// 节流函数，一段时间内只执行一次，控制执行间隔，减少流量消耗
function throttle(func, wait = 500) {
  let timer = null;
  let cd = true;

  return function (...args) {
    if (!cd) return;
    func(...args);
    cd = false;
    timer = setTimeout(() => {
      cd = true;
    }, wait);
  };
}

// 防抖函数，多次触发事件只执行一次，第一次或最后一次

function debounce(func, wait = 500, im = false) {
  let timer = null;

  return function (...args) {
    let now = !timer && im;
    clearTimeout(timer);
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      !im && func(...args);
    }, wait);
    now && func(...args);
  };
}

const test_throttle = throttle(() => {
  console.log("run throttle");
}, (wait = 1000));
const test_debounce = debounce(
  () => {
    console.log("run debounce");
  },
  200,
  true
);

let delay = 2;
let timer = setInterval(() => {
  if (delay > 2000) {
    clearInterval(timer);
  }
  test_throttle();
  test_debounce();
  delay = Math.pow(delay, 2);
  console.log(delay);
}, delay);
