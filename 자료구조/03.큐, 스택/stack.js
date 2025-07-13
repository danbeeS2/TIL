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

const stack = new Stack()
stack.push(6)
stack.push(3)
stack.push(5)
stack.push(2)
stack.push(4)
stack.push(1)

console.log(stack.top()) // 1
console.log(stack.lenght) // 6

stack.pop() // 1
stack.pop() // 4
stack.pop() // 2

console.log(stack.top()) // 5