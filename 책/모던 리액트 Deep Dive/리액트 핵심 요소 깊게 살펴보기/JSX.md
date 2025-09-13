# JSX

### 1) JSX란 무엇인가?

- JSX = **JavaScript XML**
- 자바스크립트 문법을 확장한 문법(syntax extension).
- UI 구조를 JS 안에 HTML처럼 표현할 수 있게 해줌.
- 브라우저가 직접 해석하지 못하므로 → Babel 같은 트랜스파일러가 **`React.createElement` 호출**로 변환.

---

### 2) JSXElement 구조

JSX는 문법적으로 아래 3가지 요소로 구성된다.

1. **JSXElementName**: 태그 이름

   - HTML 태그 이름 → `div`, `span` 등
   - 컴포넌트 이름 → 반드시 **대문자 시작**
   - 점(`.`)을 이용해 속성 접근도 가능 → `<Foo.Bar />`
   - 콜론(`:`)을 사용할 수도 있지만, 보통 XML 네임스페이스 문법에서 유래 → `<Svg:path />`

2. **JSXAttributes**: 속성

   - 문자열 리터럴: `<div title="hi" />`
   - JS 표현식: `<img src={url} />`
   - HTML 속성명과 다르게 camelCase 규칙 사용
     - `className`, `tabIndex`, `onClick`

3. **JSXChildren**: 자식 요소

   - 태그 안에 들어가는 값들
   - 또 다른 JSX 태그, 문자열, 표현식 `{}` 등이 올 수 있음

---

### 3) 단일 루트 필요

- 하나의 JSX 표현식은 결국 하나의 `React.createElement(...)`가 되어야 함.
- 따라서 반드시 **단일 루트 요소**를 반환해야 함.
- 여러 요소를 반환하고 싶다면

  1. 부모 태그로 감싸기
  2. `<></>` (Fragment) 사용
     - 불필요한 DOM 생성을 막기 위해 `<></>`(Fragment) 를 권장
     - 실제로 렌더링되는 DOM에는 남지 않고, 깔끔하게 children만 전달 가능

---

### 4) JSX 내부 변환

JSX는 컴파일 시 다음처럼 바뀜

```jsx
// JSX
<MyButton color="blue">Hello</MyButton>
```

```js
// Babel 변환
React.createElement(MyButton, { color: "blue" }, "Hello");
```

- 첫 번째 인자: 태그 이름(HTML 태그 문자열 or 컴포넌트 참조)
- 두 번째 인자: props 객체
- 세 번째 이후: children

⇒ **JSX 반환값은 결국 `React.createElement`으로 귀결된다**. 이를 이용하면 쉽게 리팩토링할 수 있다.

```tsx
// props 여부에 따라 chidren 요소만 달라지는 경우, 전체 내용을 삼항 연산자로 처리할 필요가 없다.
function TextOrHeading({
  isHeading, children,
}: PropsWithChildren<{isHeading: boolean}>){
  return isHeading ? {
    (<h1 className='text'>{children}</h1>) :
    (<span className='text'>{children}</span>)
  }
}

// 리팩토링
function TextOrHeading({
  isHeading, children,
}: PropsWithChildren<{isHeading: boolean}>){
  return createElement(
    // 삼항으로 전체 JSX를 감쌀 필요 없이 태그 이름만 조건부 처리 가능
    isHeading ? 'h1' : 'span',
    { className: 'text' },
    children,
  )
}
```

### 5) JSX의 특징 정리

- **표현식만 가능**: `{}` 안에는 표현식만 넣을 수 있고, 문(statement)은 불가
- **속성 네이밍 규칙**: camelCase (ex. `onClick`, `className`)
- **컴포넌트명은 대문자 시작**: 소문자는 HTML 태그로 처리됨
- **Fragment 지원**: 불필요한 DOM 요소 없이 그룹화 가능
