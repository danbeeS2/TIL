class LinkdeList {
  length = 0;
  head = null; // 첫 시작 node

  // 삽입
  add(value) {
    const newNode = new Node(value);
    if (this.head) {
      let current = this.head;

      // 마지막 노드까지 순회
      while (current.next) {
        current = current.next;
      }
      current.next = newNode; // 마지막 노드의 next에 새 노드 연결
    } else {
      this.head = newNode;
    }
    this.length++;
    return this.length;
  }
}

class Node {
  // 외부에서 받을 값은 constructor을 써줘야 함
  constructor(value) {
    this.value = value;
  }
  next = null; // 다음 노드를 가리킴
}

const ll = new LinkdeList();
ll.length;

ll.add(0); // 1
ll.add(1); // 2
ll.add(2); // 3
ll.add(3); // 4
ll.add(4); // 5
console.log(ll.add(5)); // 6
