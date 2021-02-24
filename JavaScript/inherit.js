function Father(firstName) {
  this.firstName = firstName;
}

Father.prototype.sayName = function () {
  console.log(this.firstName);
};

function Son(firstName, lastName) {
  Father.call(this, firstName);
  this.lastName = lastName;
}

Son.prototype = Object.create(Father.prototype);
Son.prototype.constructor = Son;

// 测试
const f = new Father("L");
f.sayName();
const s = new Son("L", "c");
s.sayName();
console.log(s instanceof Father && s instanceof Son);
