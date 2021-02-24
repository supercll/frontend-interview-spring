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
Son.prototype.sayFullName = function () {
  console.log(this.firstName + this.lastName);
};
const f = new Father("L");
f.sayName();
console.log(f.sayFullName)
const s = new Son("L", "c");
s.sayName();
s.sayFullName();
console.log(s instanceof Father && s instanceof Son);
