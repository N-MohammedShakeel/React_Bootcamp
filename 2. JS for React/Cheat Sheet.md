React JavaScript Cheat Sheet for Beginners
This cheat sheet covers essential JavaScript concepts for React development, focusing on ES6+ features, arrays, objects, functions, modules, asynchronous programming, classes, and immutability. It’s designed for beginners working with React, with concise examples tailored for React projects.

1. ES6+ Syntax
   Modern JavaScript (ES6+) is heavily used in React for clean, concise code.

Let and ConstUse let for variables that change, const for constants. Avoid var (old, hoisting issues).  
let count = 0; // Reassignable
count = 1;
const name = 'React'; // Cannot reassign

Arrow FunctionsShorter syntax, no own this binding (great for React event handlers).  
// Regular function
function add(a, b) { return a + b; }
// Arrow function
const add = (a, b) => a + b;
// In React (event handler)
const handleClick = () => console.log('Clicked!');

DestructuringExtract values from objects/arrays easily. Common in React props.  
// Object destructuring
const { name, age } = { name: 'Alice', age: 25 };
console.log(name); // Alice
// Array destructuring
const [first, second] = [1, 2, 3];
console.log(first); // 1
// In React props
const User = ({ name, age }) => <h1>{name}, {age}</h1>;

Spread Operator (...)Copy or merge arrays/objects. Useful for state updates in React.  
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]
const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }
// In React state
const [state, setState] = useState({ count: 0 });
setState({ ...state, count: state.count + 1 });

Template LiteralsString interpolation with backticks. Handy for dynamic JSX.  
const name = 'React';
const greeting = `Hello, ${name}!`; // Hello, React!
// In React
const Message = ({ user }) => <p>{`Welcome, ${user}!`}</p>;

2. Arrays & Objects
   Arrays and objects are core data structures in React for state, props, and lists.

Array MethodsCommon methods for manipulating arrays, often used in React for rendering lists.  
const items = [1, 2, 3, 4];
// map: Transform each element (React lists)
const doubled = items.map(num => num \* 2); // [2, 4, 6, 8]
// In React
const List = () => items.map(item => <li key={item}>{item}</li>);
// filter: Keep elements matching condition
const evens = items.filter(num => num % 2 === 0); // [2, 4]
// reduce: Aggregate to single value
const sum = items.reduce((acc, num) => acc + num, 0); // 10
// find: Get first match
const found = items.find(num => num > 2); // 3

Object MethodsWork with object properties, useful for state and props.  
const user = { name: 'Alice', age: 25 };
// Keys
console.log(Object.keys(user)); // ['name', 'age']
// Values
console.log(Object.values(user)); // ['Alice', 25]
// Entries
console.log(Object.entries(user)); // [['name', 'Alice'], ['age', 25]]
// In React: Spread props
const Component = props => <div {...props} />;

Dynamic PropertiesAdd or access properties dynamically.  
const key = 'name';
const user = { [key]: 'Bob' }; // { name: 'Bob' }
console.log(user[key]); // Bob

3. Functions & Closures
   Functions are central to React (components, hooks). Closures help manage stateful logic.

Function Declarations vs. Expressions  
// Declaration
function sayHello() { return 'Hello'; }
// Expression
const sayHi = () => 'Hi';
// In React: Arrow for components
const MyComponent = () => <div>{sayHi()}</div>;

Default ParametersProvide defaults for missing arguments.  
const greet = (name = 'Guest') => `Hi, ${name}!`;
console.log(greet()); // Hi, Guest!
// In React props
const Button = ({ text = 'Click Me' }) => <button>{text}</button>;

ClosuresA function that remembers its outer scope. Used in hooks like useEffect.  
function counter() {
let count = 0;
return () => count++; // Remembers count
}
const increment = counter();
console.log(increment()); // 0
console.log(increment()); // 1
// In React: useState closure
const [count, setCount] = useState(0);
const increment = () => setCount(prev => prev + 1);

4. Modules
   Modules organize code by splitting it into files. React uses ES Modules.

ExportingShare code from a file.  
// utils.js
export const add = (a, b) => a + b;
export default function Button() {
return <button>Click</button>;
}

ImportingUse exported code in another file.  
// App.js
import { add } from './utils';
import Button from './Button';
console.log(add(2, 3)); // 5
// In JSX
const App = () => <Button />;

Dynamic ImportsLoad modules on demand (e.g., lazy loading in React).  
import React, { lazy } from 'react';
const LazyComponent = lazy(() => import('./MyComponent'));

5. Asynchronous JavaScript
   React often fetches data (e.g., APIs). Async JS handles these operations.

PromisesHandle async operations with .then and .catch.  
fetch('https://api.example.com/data')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));

Async/AwaitCleaner syntax for promises. Common in useEffect.  
async function fetchData() {
try {
const response = await fetch('https://api.example.com/data');
const data = await response.json();
return data;
} catch (error) {
console.error(error);
}
}
// In React
useEffect(() => {
async function load() {
const data = await fetchData();
setState(data);
}
load();
}, []);

setTimeout/setIntervalDelay or repeat tasks.  
setTimeout(() => console.log('Delayed!'), 1000);
const interval = setInterval(() => console.log('Tick'), 1000);
clearInterval(interval); // Stop interval
// In React: Clean up in useEffect
useEffect(() => {
const timer = setTimeout(() => setState(true), 1000);
return () => clearTimeout(timer); // Cleanup
}, []);

6. Classes (Basic)
   Classes are used in React for class components (less common now with hooks).

Class SyntaxDefine a class with properties and methods.  
class Counter {
constructor() {
this.count = 0;
}
increment() {
this.count++;
}
}
const counter = new Counter();
counter.increment(); // count = 1

Class Component in React  
import React, { Component } from 'react';
class MyComponent extends Component {
state = { count: 0 };
handleClick = () => {
this.setState({ count: this.state.count + 1 });
};
render() {
return (
<div>
<p>Count: {this.state.count}</p>
<button onClick={this.handleClick}>Increment</button>
</div>
);
}
}

Note: Functional components with hooks (useState, useEffect) are preferred over classes in modern React for simplicity.

7. Immutability
   Immutability means not modifying data directly—create new copies instead. Critical in React for predictable state updates.

Why Immutability in React?

React relies on state changes to trigger re-renders. Mutating state directly (e.g., state.count++) skips detection.
Always use setState or spread operator to create new objects/arrays.

Examples  
// Bad: Mutating state
const [items, setItems] = useState([1, 2, 3]);
items.push(4); // DON'T DO THIS
setItems(items); // Won't trigger re-render
// Good: Create new array
setItems([...items, 4]); // [1, 2, 3, 4]
// Object example
const [user, setUser] = useState({ name: 'Alice', age: 25 });
// Bad
user.age = 26; // DON'T
setUser(user);
// Good
setUser({ ...user, age: 26 }); // New object

Immutable Array MethodsUse non-mutating methods: map, filter, slice, concat. Avoid push, pop, splice.  
const arr = [1, 2, 3];
const newArr = arr.concat([4]); // [1, 2, 3, 4], arr unchanged

Quick Tips

Always use key prop when mapping lists in React: <li key={id}>{item}</li>.
Clean up async effects (timers, subscriptions) in useEffect to avoid memory leaks.
Keep state immutable to ensure React detects changes.
Practice these in a React project (e.g., with Vite: npm create vite@latest).

This cheat sheet is your go-to reference for JavaScript in React. Save it, try the examples, and happy coding! 🚀
