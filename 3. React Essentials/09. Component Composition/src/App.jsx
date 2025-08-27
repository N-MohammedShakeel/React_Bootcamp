import { CORE_CONCEPTS } from "./data.js";
import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx";
import TabButton from "./components/TabButton.jsx";

// **Component Composition**
// - Composition is combining smaller components to build complex UIs.
// - TabButton is a reusable component that wraps content (children) in a button and list item.
// - It’s composed into the App component, showing how components work together.

// **Children Prop**
// - The 'children' prop is special: it represents content passed between a component’s opening and closing tags (e.g., <TabButton>Components</TabButton>).
// - Used to make components flexible, allowing any JSX, text, or components to be passed as content.

// **Children vs. Attribute Props**
// - **Children Prop**: Content inside tags (e.g., 'Components' in <TabButton>Components</TabButton>). Ideal for dynamic or nested JSX.
// - **Attribute Props**: Data passed as attributes (e.g., title="Components"). Used for specific, named data.
// - TabButton uses children for button text, but could use attribute props (e.g., label="Components") for explicit control.

function App() {
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept
              title={CORE_CONCEPTS[0].title}
              description={CORE_CONCEPTS[0].description}
              image={CORE_CONCEPTS[0].image}
            />
            <CoreConcept {...CORE_CONCEPTS[1]} />
            <CoreConcept {...CORE_CONCEPTS[2]} />
            <CoreConcept {...CORE_CONCEPTS[3]} />
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            {/* **Composition in Action**
                - TabButton is composed into App, reusing it multiple times with different children.
                - Each <TabButton> passes text (e.g., 'Components') as the children prop.
                - Shows how composition builds UIs by combining components like building blocks. */}
            <TabButton>Components</TabButton>
            <TabButton>JSX</TabButton>
            <TabButton>Props</TabButton>
            <TabButton>State</TabButton>
          </menu>
        </section>
      </main>
    </div>
  );
}

export default App;
