// 클래스 사용 시 기존 배열을 사용하되 사용자에 노출하고 싶은 메서드만 노출 할 수 있음
export class Queue {
  arr = [];

  enqueue(value) {
    return this.arr.push(value);
  }
  dequeue() {
    return this.arr.shift();
  }
  peek() {
    return this.arr[0];
  }

  // 메서드가 아닌 getter
  get lenght() {
    return this.arr.length;
  }
}

const queue = new Queue();
queue.enqueue(6);
queue.enqueue(3);
queue.enqueue(5);
queue.enqueue(2);
queue.enqueue(4);
queue.enqueue(1);

console.log(queue.peek()); // 6
console.log(queue.lenght); // 6

queue.dequeue(); // 6
queue.dequeue(); // 3
queue.dequeue(); // 5

console.log(queue.peek()); // 2


// 숙제 2. Linked list로 queue 구현하기
export class LinkedListQueue {
  head = null;
  tail = null;
  size = 0;

  enqueue(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
    return this.size;
  }

  dequeue() {
    if (!this.head) return null;
    const val = this.head.value;
    this.head = this.head.next;
    this.size--;

    // 마지막 요소 제거 시
    if (this.head === null) this.tail = null;

    return val;
  }

  peek() {
    return this.head?.value || null;
  }

  get lenght() {
    return this.size;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const llQueue = new LinkedListQueue();
llQueue.enqueue(1);
llQueue.enqueue(2);
llQueue.enqueue(3);
llQueue.enqueue(4);
llQueue.enqueue(5);

console.log(llQueue.peek()); // 1

llQueue.dequeue(); // 1 제거
llQueue.dequeue(); // 2 제거
llQueue.dequeue(); // 3 제거
console.log(llQueue.lenght); // 2

llQueue.dequeue(); // 4 제거
console.log(llQueue.peek()); // 5
llQueue.dequeue(); // 5 제거
llQueue.dequeue(); // null
