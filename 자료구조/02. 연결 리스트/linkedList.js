class LinkdeList {
  length = 0;
  head = null; // 첫 시작 node

  // 값 추가 (맨 뒤에 삽입)
  add(value) {
    const newNode = new Node(value);
    if (this.head) {
      let current = this.head;

      // 마지막 노드까지 순회
      while (current.next) {
        current = current.next;
      }

      // 마지막 노드의 next에 새 노드 연결
      current.next = newNode;
    } else {
      this.head = newNode;
    }
    this.length++;
    return this.length;
  }

  // 연결 리스트 전체 출력
  print() {
    let result = "";
    let current = this.head;

    while (current) {
      result += `[${current.value}] → `;
      current = current.next;
    }

    result += "null";
    console.log(result);
  }

  // 조회
  searchByIndex(index) {
    if (index < 0 || index >= this.length) return null;
    let currnet = this.head;
    for (let i = 0; i < index; i++) {
      currnet = currnet.next;
    }
    return currnet.value;
  }

  searchByValue(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return current.value;
      current = current.next;
    }
    return null;
  }
}

class Node {
  // 외부에서 받을 값은 constructor을 써줘야 함
  constructor(value) {
    this.value = value; // 데이터 저장
    this.next = null; // 다음 노드를 가리킴 (초기값은 null)
  }
}

const ll = new LinkdeList();
ll.length;

ll.add(1); // 1
ll.add(2); // 2
ll.add(3); // 3
ll.print() // [1] → [2] → [3] → null
ll.add(4); // 4
ll.add(5); // 5
console.log(ll.add(6)); // 6
ll.print(); // [1] → [2] → [3] → [4] → [5] → [6] → null

console.log(ll.searchByIndex(0)); // 1
console.log(ll.searchByIndex(2)); // 3
console.log(ll.searchByIndex(5)); // 6
console.log(ll.searchByIndex(6)); // null
console.log(ll.searchByIndex(-1)); // null

console.log(ll.searchByValue(1)); // 1
console.log(ll.searchByValue(2)); // 2
console.log(ll.searchByValue(3)); // 3
console.log(ll.searchByValue(6)); // 6
console.log(ll.searchByValue(-1)); // null
