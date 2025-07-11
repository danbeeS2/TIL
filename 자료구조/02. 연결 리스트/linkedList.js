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

  // 조회
  searchByIndex(index) {
    const current = this.#search(index)[1];
    return current ? current.value : null;
  }

  searchByValue(value) {
    const current = this.#searchByValue(value)[1];
    return current ? current.value : null;
  }

  // 삭제
  // prev → current → current.next
  // prev.next == current ⇒ prev.next == current.next
  removeByIndex(index) {
    const [prev, current] = this.#search(index);
    if (!current) return null; // 삭제하고자 하는 대상이 없을 때

    if (prev) {
      prev.next = current.next;
    } else {
      this.head = current.next; // index가 0일 때
    }

    this.length--;
    return this.length;
  }

  removeByValue(value) {
    const [prev, current] = this.#searchByValue(value);

    if (!current) return false;
    if (prev) {
      prev.next = current.next;
    } else {
      this.head = current.next;
    }

    this.length--;
    return true;
  }

  // private 메서드: 인덱스로 노드 찾기
  #search(index) {
    if (index < 0 || index >= this.length) return [null, null];

    let prev;
    let current = this.head;

    for (let i = 0; i < index; i++) {
      prev = current;
      current = current.next;
    }
    return [prev, current];
  }

  // private 메서드: 값으로 노드 찾기
  #searchByValue(value) {
    let prev = null;
    let current = this.head;

    while (current) {
      if (current.value === value) return [prev, current];
      prev = current;
      current = current.next;
    }
    return [null, null];
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

ll.add(1);
ll.add(2);
ll.add(3);
ll.print(); // [1] → [2] → [3] → null
ll.add(4);
ll.add(5);
console.log(ll.add(6)); // 6
ll.print(); // [1] → [2] → [3] → [4] → [5] → [6] → null

ll.searchByIndex(0); // 1
ll.searchByIndex(2); // 3
ll.searchByIndex(5); // 6
ll.searchByIndex(6); // null
ll.searchByIndex(-1); // null

ll.searchByValue(1);
ll.searchByValue(2);
ll.searchByValue(3);
ll.searchByValue(6);
ll.searchByValue(-1); // null

ll.print(); // [1] → [2] → [3] → [4] → [5] → [6] → null
ll.searchByIndex(5); // 6
console.log(ll.removeByIndex(5)); // 5
ll.print(); // [1] → [2] → [3] → [4] → [5] → null
console.log(ll.removeByValue(1)); // true
ll.print(); // [2] → [3] → [4] → [5] → null
ll.searchByIndex(5); // null
