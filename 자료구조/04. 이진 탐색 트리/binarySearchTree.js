export class BinarySearchTree {
  root = null;
  length = 0;

  insert(value) {
    // 어떤 값을 넣으려할때, 일단 어디에 넣을지 모르겠다.
    // 그래서 왼팔, 오른팔한테 맡긴다.
    // 근데 만약 왼팔 오른팔이 없으면 거기다가 넣는다.
    this.root = this.#insertNode(this.root, value);
    this.length++;
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

  search(value) {
    // 어떤 값을 찾으려할때, 일단 어디에 있는지 모르겠다.
    // 그래서 왼팔, 오른팔한테 맡긴다.
    // 찾으면 그 노드 return, 못찾으면 null return
    return this.#search(this.root, value);
  }

  #search(node, value) {
    if (!node) return null; // 찾는 값이 없으면 null 리턴
    if (node.value === value) return node; // 같은 값을 찾으면 리턴
    // 더 작은 값이면 왼쪽, 더 큰 값이면 오른쪽
    return node.value > value
      ? this.#search(node.left, value)
      : this.#search(node.right, value);
  }

  remove(value) {
    // 1. leaf(양팔 다 없음) -> 제거
    // 2. leaf x, 왼팔이 없다 -> 오른팔 끌어올린다
    // 3. leaf x, 오른팔이 없다 -> 왼팔 끌어올린다
    // 4. leaf x, 양팔 다 있다 -> 왼팔에서 가장 큰 애와 바꾼다,leaf를 지운다
    if (!this.search(value)) return false;
    this.root = this.#remove(this.root, value);
    this.length--;

    return `${value}가 정상적으로 삭제되었습니다. node 개수: ${this.length}`;
  }

  #remove(node, value) {
    if (!node) return null; // 제거할 값이 없으면 null 리턴

    // 같은 값을 찾을 때까지 재귀 호출
    if (node.value > value) {
      node.left = this.#remove(node.left, value);
      return node;
    }

    if (node.value < value) {
      node.right = this.#remove(node.right, value);
      return node;
    }

    // node.value === value
    if (!node.left && !node.right) return null;
    if (!node.left) return node.right;
    if (!node.right) return node.left;

    // 양쪽 다 있을 때
    // 왼쪽에서 가장 큰 값 가져오기 (오른쪽 끝까지)
    let maxNode = node.left;
    while (maxNode.right) maxNode = maxNode.right;

    node.value = maxNode.value; // 덮어쓰기
    node.left = this.#remove(node.left, maxNode.value); // 원래 maxNode 삭제하러 가기
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
console.log(bst.search(7)); // Node { value: 7, left: null, right: null }
console.log(bst.search(8)); // Node { value: 8, left: Node, right: Node }
console.log(bst.search(5)); // null
console.log(bst.remove(8));
console.log(bst.remove(15)); // false
console.log(bst.remove(4));
bst;
