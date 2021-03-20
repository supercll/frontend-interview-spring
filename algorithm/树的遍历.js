const binaryTree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    },
  },
};

/* 
// 递归版树的遍历

// 先序遍历
const prevOrder = node => {
  if (!node) return;
  console.log(node.val);
  prevOrder(node.left);
  prevOrder(node.right);
};
// 中序遍历：左中右
const inOrder = node => {
  if (!node) return;
  inOrder(node.left);
  console.log(node.val);
  inOrder(node.right);
};

// 后序遍历：左右中
const postOrder = node => {
  if (!node) return;
  postOrder(node.left);
  postOrder(node.right);
  console.log(node.val);
};
*/

/* 
非递归版：
基本思路：维护栈
*/
// 先序遍历
const prevOrder = node => {
  const stk = [node];
  while (stk.length > 0) {
    const curr = stk.pop();
    console.log(curr.val);
    if (curr.right) stk.push(curr.right);
    if (curr.left) stk.push(curr.left);
  }
};

// 中序遍历：思路 维护栈 + 指针
const inOrder = node => {
  const stk = [];
  let curr = node;

  while (curr || stk.length) {
    while (curr) {
      stk.push(curr);
      curr = curr.left;
    }
    const last = stk.pop();
    console.log(last.val);
    curr = last.right;
  }
};

// prevOrder(binaryTree);

inOrder(binaryTree);

// postOrder(binaryTree);
