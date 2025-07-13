export class BinarySearchTree {
  root = null;

  #insert(node, value) {
    // 숙제: 이미 넣은 값을 넣은 경우 에러 처리(alert, throw)
    if (node.value === value) {
      throw new Error(`${value}는 이미 포함된 숫자로 넣을 수 없습니다.`);
    }
    if (node.value > value) {
      // 루트 노드보다 작은 값이면
      if (node.left) {
        this.#insert(node.left, value);
      } else {
        node.left = new Node(value);
      }
    } else {
      // 루트 노드보다 큰 값이면
      if (node.right) {
        this.#insert(node.right, value);
      } else {
        node.right = new Node(value);
      }
    }
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
    } else {
      this.#insert(this.root, value);
    }
  }
}

class Node {
  left = null;
  right = null;
  constructor(value) {
    this.value = value;
  }
}

const bst = new BinarySearchTree();
[8, 10, 3, 1, 14, 6, 7, 4, 13].forEach((num) => bst.insert(num));

console.log(JSON.stringify(bst.root, null, 2));
