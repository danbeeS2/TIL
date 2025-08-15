# this

this는 `자신이 속한 객체`를 가리키거나 `자신이 생성할 인스턴스`를 가리키는 `자기 참조 변수`이다.  
this를 통해 자신이 속한 객체 / 자신이 생성할 인스턴스의 `프로퍼티` / `메서드`를 참조할 수 있다.

this는 자바스크립트 엔진에 의해서 암묵적으로 생성되며, 코드 어디서든 참조할 수 있다.  
this가 가르키는 값(= this 바인딩)은 `함수 호출 방식에 의해 동적으로 결정`된다.

## 함수 호출 방식과 this 바인딩

this는 함수 코드를 평가하는 시점이 아니라 함수가 호출되는 시점에 바인딩된다.

### 자바스크립트의 함수 호출 방식

1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

   ```javascript
   function foo() {
     console.log(this);
   }

   // 1. 일반 함수 호출
   foo(); // strict: undefined / non-strict: window

   // 2. 메서드 호출
   const obj = { foo };
   obj.foo(); // this = obj

   // 3. 생성자 함수 호출
   new foo(); // this = 새로 생성된 인스턴스

   // 4. call / apply / bind에 의한 간접 호출
   // this를 내가 지정한 값을 변경 가능 (첫번째 인수를 this 바인딩 값으로 사용)
   const obj2 = { value: 123 };
   foo.call(obj2); // this = obj2
   foo.apply(obj2); // this = obj2
   foo.bind(obj2)(); // this = obj2
   ```

---

### 1) 일반 함수 호출

기본적으로 this에는 **전역 객체**가 바인딩된다. 중첩 함수도 마찬가지이다.  
this는 객체의 프로퍼티나 메서드를 참조하기 위한 참조 변수이므로, 전역 객체를 가리키는 것은 바람직하지 않다.  
`strict mode`가 적용되면 this는 `undefined`가 바인딩된다.

메서드 내에서 정의한 **중첩 함수**도 일반 함수로 호출되면 this는 전역 객체를 가리킨다.

```javascript
const obj = {
  outer() {
    console.log(this); // obj

    function inner() {
      console.log(this); // window
    }
    inner(); // 일반 함수 호출 ⇒ this = window
  },
};
obj.outer(); // 메서드 호출 ⇒ this = obj
```

**콜백 함수**도 일반 함수로 호출된다면 this는 전역 객체를 가리킨다.

```javascript
var value = 1;
const obj = {
  outer() {
    value: 100;
    console.log(this); // obj

    setTiemeout(function () {
      console.log(this); // window
      console.log(this.value); // 1
    }, 1000); // 일반 함수 호출 ⇒ this = window
  },
};
obj.outer(); // 메서드 호출 ⇒ this = obj
```

> **일반 함수로 호출된 모든 함수 내부의 this**에는 전역 객체가 바인딩된다.

메서드의 this와 메서드 내에서 정의한 헬퍼 함수의 this가 다른 것은 큰 문제가 된다.  
this를 통일 시키기 위해 3가지 방법을 사용할 수 있다.

① this를 변수에 할당

```javascript
var value = 1;
const obj = {
  outer() {
    value: 100;
    console.log(this); // obj

    // this 바인딩(obj)을 변수 self에 할당
    const self = this;

    // 콜백 함수 내부에서도 this 대신 self를 참조
    setTiemeout(function () {
      console.log(self.value); // 100
    }, 1000);
  },
};
obj.outer();
```

② bind, apply, call 사용

```javascript
var value = 1;
const obj = {
  outer() {
    value: 100;
    console.log(this); // obj

    // 콜백 함수에 명시적으로 this를 바인딩
    setTiemeout(
      function () {
        console.log(this.value); // 100
      }.bind(this),
      1000
    );
  },
};
```

③ 화살표 함수 사용

```javascript
var value = 1;
const obj = {
  outer() {
    value: 100;
    console.log(this); // obj

    setTimeout(() => {
      console.log(this.value); // 100
    }, 1000);
  },
};
```

**화살표 함수**의 내부 this는 `상위 스코프의 this`를 가리킨다.

---

### 2) 메서드 호출

메서드 내부의 this에는 **메서드를 호출한 객체**, 즉 메서드를 호출할 때 메서드 이름 앞의 마침표(.) 앞에 기술한 객체가 바인딩된다.

```javascript
const person = {
  name: "danbi",
  getName() {
    console.log(this.name);
  },
};

// getName 메서드를 호출한 객체는 person
person.getName(); // danbi
```

this는 평가 시점이 아니라 **호출 시점에 바인딩**되므로, 메서드를 다른 변수에 할당하고 호출하면 this가 변경될 수 있다.

```javascript
const person = {
  name: "danbi",
  getName() {
    console.log(this.name);
  },
};

const another = { name: "lee" };

// 함수 객체의 참조값(주소) 복사
// ⇒ 이제 person.getName과 another.getName은 같은 함수 객체를 가르킴
another.getName = person.getName;

// 메서드를 호출한 객체는 another ⇒ this = another
another.getName(); // lee

const f = person.getName;

f(); // 일반 함수로 호출
// - 브라우저 비엄격 모드: this = window ⇒ window.name 기본값 ""
// - Node.js: this = global ⇒ global.name 기본값 없음 ⇒ undefined
// - 엄격 모드('use strict'): this = undefined ⇒ this.name 접근 시 TypeError
```

---

### 3) 생성자 함수 호출

생성자 함수 내부의 this에는 생성자 함수가 생성할 인스턴스가 바인딩된다.

```javascript
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

new Circle(5); // Circle { radius: 5, getDiameter: f }
```

`new 연산자` 없이 호출하면 일반 함수 호출이 된다.

> 일반 함수로 호출된 Circle에는 리턴 값이 없기 때문에 undefined가 반환된다.  
> 또, this는 **전역 객체**를 가리킨다. window.radius에 특정한 값이 들어가게 된다.

```javascript
const circle = Circle(10); //  this = window ⇒ window.radius = 10
console.log(circle); // // return 값 없음 → undefined

console.log(window.radius); // 10 ← 전역 객체에 프로퍼티가 생김
console.log(radius); // 10  ← 전역 변수처럼 접근 가능
```

---

### 4) Function.prototype.apply / call / bind 메서드에 의한 간접 호출

apply, call, bind 메서드는 Function.prototype의 메서드다.  
이 메서드들을 사용하면 **`this`를 원하는 값으로 명시적으로 바인딩할 수 있다.**  
apply와 call은 함수를 즉시 호출하고, bind는 this가 바인딩된 함수를 리턴한다는 차이가 있다.  
apply와 call은 인수 전달 방법만 다르다. apply는 배열로, call은 인수 리스트로 전달한다.

`bind 사용 예시`

```javascript
const person = {
  name: "danbi",
  foo1(cb) {
    setTimeout(cb, 1000);
  }, // this 고정 안 됨
  foo2(cb) {
    setTimeout(cb.bind(this), 1000);
  }, // this = person 로 고정
};

person.foo1(function () {
  console.log(this.name); // 브라우저 비엄격 모드: window.name ⇒ ''
});
person.foo2(function () {
  console.log(this.name); //  person.name ⇒ 'danbi'
});
```

- `bind`는 **새로운 함수 객체를 반환**할 뿐, 원본 함수의 this 바인딩에는 영향을 주지 않음
- 원본 함수의 this는 여전히 호출 방식에 따라 결정됨

## 정리

| 함수 호출 방식             | this 바인딩                         |
| -------------------------- | ----------------------------------- |
| 일반 함수 호출             | 전역 객체                           |
| 메서드 호출                | 메서드를 호출한 객체                |
| 생성자 함수 호출 (`new`)   | 생성자 함수가 생성할 인스턴스       |
| apply / call / bind 메서드 | 메서드의 첫 번째 인수로 명시한 객체 |
