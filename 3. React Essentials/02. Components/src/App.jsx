// **What is a Component in React?**
// A component is a reusable, self-contained piece of UI (like a button, header, or form).
// It can be a function or class that returns JSX (HTML-like syntax) to describe what to render.
// Components can accept inputs (props) and manage their own state, making them modular and reusable.

// **Header Component**
// This is a functional component (modern React prefers these over class components).
// It returns JSX to define a header with an image, title, and paragraph.
// Reusable: You can use <Header /> anywhere in your app.
function Header() {
  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        Fundamental React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

// **App Component**
// This is the root component of your app, also a functional component.
// It composes the UI by including the <Header /> component and a <main> section.
// Components are nested to build complex UIs from smaller pieces.
function App() {
  return (
    <div>
      <Header /> {/* Reusing the Header component */}
      <main>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

// **Exporting the App Component**
// This makes App available to be imported elsewhere (e.g., in index.js to render it).
// Components must be exported to be used in other files.
export default App;

// **Key Points About Components**
// - **Types**: Functional (like Header, App) or Class (less common now).
// - **JSX**: Components return JSX to describe UI structure.
// - **Reusability**: Use the same component multiple times (e.g., <Header /> in multiple places).
// - **Props**: Pass data to components (not shown here but like <Header title="My App" />).
// - **Hierarchy**: Components can contain other components, forming a tree-like structure.
// Your code shows a simple component hierarchy: App contains Header.
