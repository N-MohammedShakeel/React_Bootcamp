// **Array for Dynamic Content**
// Defines an array of strings to be used dynamically in the Header component.
const reactDescriptions = ["Fundamental", "Crucial", "Core"];

// **Helper Function for Random Index**
// Generates a random integer (0 to max) to select a description.
function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function Header() {
  // **Curly Braces Usage**
  // {description} in JSX evaluates the JS variable 'description'.
  // Curly braces allow embedding any JS expression (variables, functions, calculations) in JSX.
  const description = reactDescriptions[genRandomInt(2)];

  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {/* **Curly Braces in Action**
            - {description} inserts the value of 'description' (e.g., 'Fundamental').
            - Can include expressions like {2 + 2} or {genRandomInt(2)}.
            - Must return a single value (string, number, array for mapping, etc.).
        */}
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;

// **Curly Braces Limitations in JSX**
// - Only **expressions** are allowed inside {} (e.g., variables, calculations, function calls).
// - **Statements** like if, for loops, or function declarations are NOT allowed.
//   Example: {if (true) return 'Hi'} will cause an error.
// - Must resolve to a single value (string, number, JSX element, etc.).
// - Use arrays with .map() for lists: {items.map(item => <li>{item}</li>)}.
// - For complex logic, compute outside JSX or use a component/helper function.
