function People(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function sayName() {
    console.log(this.name);
  };
}

People.prototype.sayAge = function () {
  console.log(this.age);
};

const p1 = new People("lc", 18);
p1.sayName();
p1.sayAge();

Object.prototype._create = function (prototype) {
  if (!prototype instanceof Object) {
    throw TypeError("prototype must be an object");
  }
  const obj = {};
  obj.__proto__ = prototype;
  return obj;
};

function _new(Func, ...args) {
  // 1 创建一个空对象，其原型链指向 传入类的原型
  const obj = Object._create(Func.prototype);
  // 2 类本质也是个函数，执行次函数，并且改变this指向上一步创建的空对象
  const res = Func.call(obj, ...args);
  // 3 判断类的执行结果，若结果是对象，那么返回此对象，否则返回obj
  if (res instanceof Object) {
    return res;
  }
  return obj;
}
const p2 = _new(People, "CL", 21);
p2.sayName();
p2.sayAge();

console.log(p2 instanceof People);
