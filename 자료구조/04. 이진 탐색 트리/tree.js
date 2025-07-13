class Tree {
  constructor(value) {
    this.root = new Node(value);
  }
}

class Node {
  children = [];
  constructor(value) {
    this.value = value;
  }

  // new Node(value)를 push 해야 자식도 다시 children을 가질 수 있음
  push(value) {
    this.children.push(new Node(value));
  }
}

const tree = new Tree(50);
tree.root.push(25);
tree.root.push(75);
tree.root.children[0].push(10);
tree.root.children[0].push(15);
tree.root.children[1].push(30);
tree.root.children[1].push(62);
