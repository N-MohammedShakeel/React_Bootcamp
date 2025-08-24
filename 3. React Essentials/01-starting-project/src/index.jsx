// **Importing ReactDOM**
// ReactDOM is a library that connects React to the browser's DOM (Document Object Model).
// "react-dom/client" provides the modern API for rendering React apps (introduced in React 18).
import ReactDOM from "react-dom/client";

// **Importing the App Component**
// Imports the root component (App.jsx) where your app's UI starts.
// This is the main entry point for your React application's component tree.
import App from "./App.jsx";

// **Importing CSS**
// Imports a CSS file (index.css) to style the app.
// Applied globally to the entire app, affecting all components.
import "./index.css";

// **Selecting the DOM Entry Point**
// Gets the HTML element with id="root" (usually in index.html).
// This is where React will "inject" the entire app into the webpage.
const entryPoint = document.getElementById("root");

// **Rendering the App**
// Creates a root for React to manage (using createRoot, modern API).
// .render(<App />) tells React to render the App component (and its children) into the #root element.
// This starts the React app, turning JSX into actual DOM elements.
ReactDOM.createRoot(entryPoint).render(<App />);
