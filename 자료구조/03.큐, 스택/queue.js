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
