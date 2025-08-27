import reactImg from "./assets/react-core-concepts.png";
import componentsImg from "./assets/components.png";

const reactDescriptions = ["Fundamental", "Crucial", "Core"];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function Header() {
  const description = reactDescriptions[genRandomInt(2)];

  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

// **What are Props in React?**
// - Props (short for properties) are inputs passed to a component to customize its behavior or output.
// - They are read-only, allowing parent components to send data (e.g., strings, objects, functions) to child components.
// - Props make components reusable by enabling dynamic content without hardcoding values.

// **Usage of Props**
// - Define props as a parameter in the component (e.g., `props`).
// - Access props using dot notation (e.g., `props.title`) or destructuring (e.g., `{ title }`).
// - In JSX, pass props as attributes when using the component (e.g., `<CoreConcept title="Components" />`).
function CoreConcept(props) {
  return (
    <li>
      <img src={props.image} alt={props.title} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {/* **Props in Action**
                - Each CoreConcept component receives unique props (title, description, image).
                - Props allow the same component to render different data based on what the parent (App) passes. */}
            <CoreConcept
              title="Components"
              description="The core UI building block."
              image={componentsImg}
            />
            <CoreConcept
              title="Props"
              description="Data passed from parent to child."
              image={reactImg}
            />
            <CoreConcept
              title="State"
              description="Local data storage for components."
              image={reactImg}
            />
            <CoreConcept
              title="Lifecycle"
              description="Managing component lifecycle events."
              image={reactImg}
            />
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
