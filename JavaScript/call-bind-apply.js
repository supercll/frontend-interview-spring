Function.prototype._call = function call(context, ...args) {
  context = context == null ? window : context;
  if (!(context instanceof Object)) {
    context = Object(context);
  }

  const fn = Symbol("fn");
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
};

Function.prototype._bind = function (context, ...args) {
  const _this = this;
  return function (...params) {
    _this._call(context, ...args.concat(params));
  };
};

Function.prototype._apply = function (context, paramsArray) {
  this._call(context, ...paramsArray);
};

const obj = {
  name: "lc",
};

function test(age) {
  this.age = age;
  console.log(this);
}
test._call(obj, 18);
test._bind(obj, 18)();
test._apply(obj, [18]);
