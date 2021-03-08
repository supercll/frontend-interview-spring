function Modal(x, y) {
  this.x = x;
  this.y = y;
}
Modal.prototype.z = 10;
Modal.prototype.getX = function () {
  console.log(this.x);
};
Modal.prototype.getY = function () {
  console.log(this.y);
};
Modal.n = 200;
Modal.setNumber = function (n) {
  this.n = n;
};
let m = new Modal(10, 20);
console.log(m);

class ModalTwo {
  static n = 200;
  static setNumber = function (n) {
    this.n = n;
  };
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getX() {
    console.log(this.x);
  }
  getY() {
    console.log(this.y);
  }
}
ModalTwo.prototype.z = 10;

const m2 = new ModalTwo(10, 20);
console.log(m2);
