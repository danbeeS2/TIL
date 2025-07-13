// 클래스 사용 시 기존 배열을 사용하되 사용자에 노출하고 싶은 메서드만 노출 할 수 있음
export class Stack {
  arr = [];

  push(value) {
    return this.arr.push(value);
  }
  pop() {
    return this.arr.pop();
  }
  top() {
    return this.arr.at(-1);
  }

  // 메서드가 아닌 getter
  get lenght() {
    return this.arr.length;
  }
}

const stack = new Stack();
stack.push(6);
stack.push(3);
stack.push(5);
stack.push(2);
stack.push(4);
stack.push(1);

console.log(stack.top()); // 1
console.log(stack.lenght); // 6

stack.pop(); // 1
stack.pop(); // 4
stack.pop(); // 2

console.log(stack.top()); // 5

// 숙제 1. Linked list로 stack 구현하기
export class LinkedListStack {
  top = null;
  size = 0;

  push(value) {
    const newNode = new Node(value);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;

    return this.size;
  }

  pop() {
    if (!this.top) return null;

    const val = this.top.value;
    this.top = this.top.next;
    this.size--;
    return val;
  }

  peek() {
    return this.top?.value || null;
  }

  get length() {
    return this.size;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const llStack = new LinkedListStack();
llStack.push(1);
llStack.push(3);
llStack.push(2);
llStack.push(5);
llStack.push(4);

console.log(llStack.peek()); // 4

llStack.pop(); // 4 제거
llStack.pop(); // 5 제거
llStack.pop(); // 2 제거

console.log(llStack.length); // 2
console.log(llStack.peek()); // 3

llStack.push(6);
console.log(llStack.peek()); // 6
