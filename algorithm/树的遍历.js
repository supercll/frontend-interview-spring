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
递归版树的遍历
*/

// 先序遍历
const prevOrder = node => {
  if (!node) return;
  console.log(node.val);
  prevOrder(node.left);
  prevOrder(node.right);
};
// prevOrder(binaryTree);
// 中序遍历：左中右
const inOrder = node => {
  if (!node) return;
  inOrder(node.left);
  console.log(node.val);
  inOrder(node.right);
};
// inOrder(binaryTree);

// 后序遍历：左右中
const postOrder = node => {
  if (!node) return;
  postOrder(node.left);
  postOrder(node.right);
  console.log(node.val);
};
postOrder(binaryTree);
