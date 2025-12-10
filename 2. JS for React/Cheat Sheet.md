# React JavaScript Cheat Sheet for Beginners

A beginner‑friendly **JavaScript + React MD guide** covering all the fundamentals you need when working on React projects. This includes ES6+ syntax, arrays, objects, functions, modules, async JS, classes, immutability, plus additional tips and examples.

---

## 1. ES6+ Syntax

Modern JavaScript (ES6+) powers React development. These features help write cleaner and more readable code.

### **Let and Const**

- `let` → reassignable variables
- `const` → cannot reassign
- Avoid `var` due to hoisting issues.

```js
let count = 0;
count = 1;

const appName = "React";
// appName = "New" ❌ (Error)
```

---

### **Arrow Functions**

Short syntax and no own `this` — perfect for React components & event handlers.

```js
// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;

// React event handler
const handleClick = () => console.log("Clicked");
```

---

### **Destructuring**

Extract values easily — widely used for **props**.

```js
// Object destructuring
const { name, age } = { name: "Alice", age: 25 };

// Array destructuring
const [first, second] = [10, 20, 30];
```

**React Example:**

```jsx
const User = ({ name, age }) => (
  <h1>
    {name} - {age}
  </h1>
);
```

---

### **Spread Operator ...**

Useful for cloning or merging objects/arrays.

```js
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 };
```

**React State Update:**

```js
const [state, setState] = useState({ count: 0 });
setState({ ...state, count: state.count + 1 });
```

---

### **Template Literals**

String interpolation with backticks.

```js
const name = "React";
const msg = `Hello, ${name}!`;
```

React Example:

```jsx
<p>{`Welcome, ${user}!`}</p>
```

---

## 2. Arrays & Objects

React relies heavily on arrays (lists) and objects (props, state).

### **Array Methods (map, filter, reduce, find)**

```js
const items = [1, 2, 3, 4];

// map
const doubled = items.map((n) => n * 2);

// filter
const evens = items.filter((n) => n % 2 === 0);

// reduce
const sum = items.reduce((acc, n) => acc + n, 0);

// find
const found = items.find((n) => n > 2);
```

**React List Rendering:**

```jsx
const List = () => (
  <ul>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);
```

---

### **Object Methods**

```js
const user = { name: "Alice", age: 25 };
Object.keys(user); // ['name','age']
Object.values(user); // ['Alice',25]
Object.entries(user); // [['name','Alice'], ['age',25]]
```

---

### **Dynamic Properties**

```js
const key = "name";
const user = { [key]: "Bob" }; // { name: 'Bob' }
```

---

## 3. Functions & Closures

Functions are essential in React components & hooks.

### **Default Parameters**

```js
const greet = (name = "Guest") => `Hello, ${name}`;
```

React Example:

```jsx
const Button = ({ text = "Click" }) => <button>{text}</button>;
```

---

### **Closures (important for hooks)**

```js
function counter() {
  let count = 0;
  return () => count++;
}

const inc = counter();
inc(); // 0
inc(); // 1
```

React Example:

```js
setCount((prev) => prev + 1); // closure
```

---

## 4. Modules (import/export)

React uses ES Modules everywhere.

### **Export & Import**

```js
// utils.js
export const add = (a, b) => a + b;
export default function Button() {
  return <button>Click</button>;
}
```

```js
// App.js
import { add } from "./utils";
import Button from "./Button";
```

### **Dynamic Import (Lazy Loading)**

```js
const LazyComp = React.lazy(() => import("./MyComponent"));
```

---

## 5. Asynchronous JavaScript

Used for API calls in React.

### **Promises**

```js
fetch("/api/data")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

### **Async/Await**

```js
async function fetchData() {
  const res = await fetch("/api");
  return await res.json();
}
```

**React Example:**

```jsx
useEffect(() => {
  async function load() {
    const data = await fetchData();
    setState(data);
  }
  load();
}, []);
```

### **setTimeout / setInterval**

```js
setTimeout(() => console.log("Later"), 1000);
```

React Cleanup Example:

```jsx
useEffect(() => {
  const t = setTimeout(() => setOpen(true), 1000);
  return () => clearTimeout(t);
}, []);
```

---

## 6. Classes (Basics)

Modern React uses hooks, but classes still exist.

### **Class Example**

```js
class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count++;
  }
}
```

### **React Class Component**

```jsx
class MyComponent extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
```

---

## 7. Immutability in React

React depends on detecting **new values**, so never mutate state directly.

### **Bad (mutating)**

```js
items.push(4); // ❌ no re-render
setItems(items);
```

### **Good (immutable)**

```js
setItems([...items, 4]);
```

### **Immutable Object Update**

```js
setUser({ ...user, age: 26 });
```

### **Safe Array Methods**

- map
- filter
- slice
- concat

Avoid: push, pop, splice

---

## 8. Additional Helpful Concepts

### **Optional Chaining (?.)**

Prevents errors for undefined values.

```js
const city = user?.address?.city;
```

### **Nullish Coalescing (??)**

Fallback only if `null` or `undefined`.

```js
const username = input ?? "Guest";
```

### **Short-circuit Rendering in React**

```jsx
{
  isLoggedIn && <Dashboard />;
}
```

### **React Best Practices**

- Always use **keys** when rendering lists
- Keep functions **pure** inside renders
- Use **custom hooks** for reusable logic
- Keep components small & readable
- Prefer functional components over classes

---

## Quick Summary

✔ ES6+ Syntax → Let/Const, Arrow Functions, Spread, Destructuring
✔ Arrays & Objects → map, filter, dynamic keys
✔ Functions → default params, closures
✔ Modules → import/export
✔ Async JS → async/await, fetch
✔ Classes → old but useful
✔ Immutability → essential for state updates
✔ Extra Concepts → optional chaining, short-circuiting

---

## Final Note

This cheat sheet is designed as a **go-to reference** while building React projects. Practice these snippets daily for mastery.

🚀 Happy Coding!
