export class BinarySearchTree {
  root = null;

  insert(value) {
    this.root = this.#insertNode(this.root, value);
  }

  #insertNode(node, value) {
    // 계속 재귀로 내려가다가 비어 있는 자리를 발견하면 새로운 노드 삽입
    if (!node) {
      return new Node(value);
    }

    // 숙제: 이미 넣은 값을 넣은 경우 에러 처리(alert, throw)
    if (node.value === value) {
      throw new Error(`${value}는 이미 존재하는 값입니다.`);
    }

    if (node.value > value) {
      // 노드보다 작은 값이면 왼쪽에 넣기
      node.left = this.#insertNode(node.left, value);
    } else {
      // 노드보다 큰 값이면 오른쪽에 넣기
      node.right = this.#insertNode(node.right, value);
    }

    return node;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const bst = new BinarySearchTree();
[8, 10, 3, 1, 14, 6, 7, 4, 13].forEach((num) => bst.insert(num));

console.log(JSON.stringify(bst.root, null, 2));
