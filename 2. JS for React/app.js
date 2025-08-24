// === 1. ES6+ Syntax ===
const appTitle = "Todo Manager";
let version = 1;

// === 2. Destructuring + Spread/Rest ===
const user = { id: 101, name: "Alice", age: 22 };
const { name, age } = user; // object destructuring
const updatedUser = { ...user, age: 23 }; // spread operator

const numbers = [1, 2, 3];
const [first, ...rest] = numbers; // array destructuring + rest
console.log(first, rest); // 1 [2,3]

// === 3. Arrays: Map, Filter, Reduce, Sort ===
const todos = [
  { id: 1, task: "Learn JS", done: true },
  { id: 2, task: "Learn React", done: false },
  { id: 3, task: "Practice ES6", done: false },
];

const tasks = todos.map((todo) => todo.task); // map
const pending = todos.filter((todo) => !todo.done); // filter
const completedCount = todos.reduce(
  (acc, todo) => acc + (todo.done ? 1 : 0),
  0
); // reduce
const sortedTodos = [...todos].sort((a, b) => a.task.localeCompare(b.task)); // sort

// === 4. Functions & Arrow Functions ===
const add = (a, b) => a + b; // arrow function
console.log("Sum:", add(5, 7));

// Closure Example
function counter() {
  let count = 0;
  return () => ++count; // closure remembers "count"
}
const countClicks = counter();
console.log(countClicks()); // 1
console.log(countClicks()); // 2

// === 5. Ternary Operator ===
const isLoggedIn = true;
const message = isLoggedIn ? "Welcome back!" : "Please log in.";
console.log(message);

// === 6. Short-Circuiting & Logical Operator ===
const username = null;
const displayName = username || "Guest"; // fallback if null/undefined/false
console.log(displayName);

const isAdmin = true;
isAdmin && console.log("Access granted!"); // runs only if true

// === 7. Optional Chaining (Null Safety) ===
const profile = { user: { info: { email: "alice@mail.com" } } };
console.log(profile.user?.info?.email); // "alice@mail.com"
console.log(profile.user?.address?.city); // undefined (safe)

// === 8. Promises & Async/Await ===
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

delay(1000).then(() => console.log("1 second passed (Promise then)"));

async function fetchUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await res.json();
  console.log("Fetched user:", data.name);
}
fetchUser();

// === 9. Classes (OOP) ===
class Animal {
  constructor(type) {
    this.type = type;
  }
  speak() {
    console.log(`${this.type} makes a sound`);
  }
}
class Dog extends Animal {
  speak() {
    console.log(`${this.type} barks`);
  }
}
const dog = new Dog("Bulldog");
dog.speak();

// === 10. Immutability Example ===
const user2 = { name: "Bob", city: "NY" };
const updatedUser2 = { ...user2, city: "LA" }; // don’t mutate, create new
console.log(updatedUser2);

// === Final Output ===
console.log(`\n=== ${appTitle} v${version} ===`);
console.log("User:", updatedUser);
console.log("All tasks:", tasks);
console.log("Pending:", pending);
console.log("Completed count:", completedCount);
console.log("Sorted Todos:", sortedTodos);
