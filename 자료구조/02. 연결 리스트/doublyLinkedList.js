// 숙제 1. prev 추가하기
// 숙제 2. 삽입의 시간 복잡도 O(n)에서 O(1)으로 변경하기 (hint: tail)
class LinkdeList {
  length = 0;
  head = null;
  tail = null;

  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail; // 새 노드의 prev 연결
      this.tail.next = newNode; // tail의 next 연결
      this.tail = newNode; // 마지막 노드 업데이트
    }
    this.length++;
    return this.length;
  }

  #search(index) {
    if (index < 0 || index >= this.length) return [null, null, null];

    let current;
    if (index < this.length / 2) {
      // 앞에서부터 순회
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      // 뒤에서부터 순회
      current = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        current = current.prev;
      }
    }

    const prevVal = current.prev;
    const curVal = current;
    const nextVal = current.next;

    return [prevVal, curVal, nextVal];
  }

  search(index) {
    return this.#search(index)[1]?.value ?? null;
  }

  searchPrev(index) {
    return this.#search(index)[0]?.value ?? null;
  }

  searchNext(index) {
    return this.#search(index)[2]?.value ?? null;
  }

  remove(index) {
    const [prev, current, next] = this.#search(index);
    if (!current) return null;

    if (prev) prev.next = next;
    else this.head = next;

    if (next) next.prev = prev;
    else this.tail = prev;

    this.length--;
    return `삭제 완료! length: ${this.length}`;
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
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

const ll = new LinkdeList();
ll.add("a");
ll.add("b");
ll.add("c");
ll.add("d");
ll.add("e");
ll.print(); // [a] → [b] → [c] → [d] → [e] → null

console.log(ll.search(2)); // c
console.log(ll.searchPrev(2)); // b
console.log(ll.searchNext(2)); // d
console.log(ll.remove(2)); // 삭제 완료! length: 4
ll.print(); // [a] → [b] → [d] → [e] → null
