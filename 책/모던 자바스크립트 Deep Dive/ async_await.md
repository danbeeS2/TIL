# `async`/`await`

- `async/await`는 **프로미스를 더 직관적으로 다룰 수 있는 문법**이다.
- 프로미스의 후속 처리 메서드(`then`, `catch`) 없이도, **동기 코드처럼 순차적으로** 비동기 로직을 작성할 수 있다.
- 내부적으로는 여전히 **프로미스 기반**으로 동작한다.

  ```js
  const fetch = require("node-fetch"); // Node.js 환경일 때 필요 (브라우저는 내장됨)

  async function fetchTodo() {
    try {
      const url = "https://jsonplaceholder.typicode.com/todos/1";

      // 비동기 호출을 동기 코드처럼 작성
      const response = await fetch(url); // 비동기 호출
      const todo = await response.json(); // 결과 처리

      console.log(todo);
    } catch (err) {
      console.error("에러 발생:", err);
    }
  }

  fetchTodo();
  ```

### 1. `async` 함수

- **`async` 함수**는 항상 프로미스를 반환한다.

- 일반 값 반환 → `Promise.resolve(값)`으로 감싸져 반환
- 에러 발생(`throw`) → `Promise.reject(에러)` 반환

  ```js
  async function foo() {
    return 42;
  }
  foo().then((v) => console.log(v)); // 42
  ```

  > ⚠️ **클래스 `constructor`는 async가 될 수 없음**
  >
  > - 생성자는 인스턴스를 **즉시 반환**해야 하지만
  > - `async` 함수는 항상 프로미스를 반환하기 때문

---

### 2. `await` 키워드

- 프로미스가 **settled 상태**가 될 때까지 기다림
- `fulfilled`이면 값을 반환, `rejected`이면 에러 발생(throw)
- 반드시 `async` 함수 안에서만 사용 가능

---

### 3. 순차 vs 병렬 실행

```js
// (1) 순차 실행 → 약 6초 소요
async function foo1() {
  const a = await new Promise((resolve) => setTimeout(() => resolve(1), 3000));
  const b = await new Promise((resolve) => setTimeout(() => resolve(2), 2000));
  const c = await new Promise((resolve) => setTimeout(() => resolve(3), 1000));
  console.log([a, b, c]); // [1, 2, 3]
}
```

```js
// (2) 병렬 실행 → 약 3초 소요
// 서로 연관이 없기 때문에 개별적으로 비동기 처리할 필요 X ⇒ Promise.all 사용
async function foo2() {
  const res = await Promise.all([
    new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
    new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
  ]);
  console.log(res); // [1, 2, 3]
}
```

```js
// (3) 의존적 실행 → 순차 처리 필수
// 앞선 비동기 처리 결과를 다음 단계 처리에서 사용 (=비동기 처리의 순서가 보장되어야 함)
// ⇒ 모든 프로미스에 await을 써서 순차적으로 처리할 수밖에 없음
async function foo3() {
  const a = await new Promise((resolve) => setTimeout(() => resolve(1), 3000));
  const b = await new Promise((resolve) =>
    setTimeout(() => resolve(a + 1), 2000)
  );
  const c = await new Promise((resolve) =>
    setTimeout(() => resolve(b + 1), 1000)
  );
  console.log([a, b, c]); // [1, 2, 3]
}
```

---

### 4. 에러 처리

- `try...catch` 블록을 사용해 동기 코드처럼 처리 가능
- `catch` 블록에 잡히지 않으면 → 함수는 `reject`된 프로미스를 반환
- 따라서 호출 측에서 `.catch()`로도 처리 가능

  ```js
  async function fetchData() {
    throw new Error("문제 발생!");
  }

  fetchData().catch((err) => console.error("잡힘:", err.message));
  ```

#### ① `try...catch` 블록 사용

- `async` 함수 내부에서 `try...catch`를 쓰면

  - **HTTP 통신 에러**(네트워크, CORS 등)
  - **일반 동기 에러**(오타, undefined 접근 등)
    모두 잡을 수 있다.

  ```js
  const fetch = require("node-fetch");

  const foo = async () => {
    try {
      const wrongUrl = "https://wrong.url";

      const response = await fetch(wrongUrl); // 네트워크 에러 발생
      const data = await response.json();
      console.log(data);
    } catch (err) {
      // try...catch 문으로 에러 처리
      console.error("잡힘:", err); // TypeError: Failed to fetch
    }
  };

  foo();
  ```

---

#### ② 호출 측에서 `.catch()` 처리

- 만약 `async` 함수 안에서 `try...catch`를 쓰지 않으면, 함수는 **reject된 프로미스**를 반환한다.
- 따라서 호출하는 쪽에서 `.catch()`로 에러를 잡을 수 있다.

  ```js
  const fetch = require("node-fetch");

  const foo = async () => {
    const wrongUrl = "https://wrong.url";

    const response = await fetch(wrongUrl); // 네트워크 에러 발생
    const data = await response.json();
    return data;
  };

  foo()
    .then(console.log)
    // 호출 측에서 .catch()로 에러 처리
    .catch(console.error); // TypeError: Failed to fetch
  ```

## 정리

- **`async`**: 함수의 반환값을 항상 프로미스로 감쌈
- **`await`**: 프로미스 결과를 기다렸다가 반환
- **장점**: `then` 체이닝 대신 동기 코드처럼 작성 → 가독성 ↑
- **에러 처리**: `try...catch` 또는 `.catch()`로 동기 코드와 동일하게 처리 가능
