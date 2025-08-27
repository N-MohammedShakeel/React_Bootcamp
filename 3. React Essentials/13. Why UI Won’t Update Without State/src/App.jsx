import { CORE_CONCEPTS } from "./data.js";
import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx";
import TabButton from "./components/TabButton.jsx";

function App() {
  // **Why UI Won't Update**
  // - `tabContent` is a regular variable, not React state.
  // - Changing it (e.g., `tabContent = selectedButton`) doesn't trigger a re-render in React.
  // - React only re-renders when state (via `useState`) or props change, as it relies on these to detect updates.
  let tabContent = "Please click a button";

  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', 'state'
    // **Issue**: Assigning to `tabContent` updates the variable but doesn't tell React to re-render the UI.
    tabContent = selectedButton;
    console.log(tabContent);
  }

  console.log("APP COMPONENT EXECUTING");

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
            <TabButton onSelect={() => handleSelect("components")}>
              Components
            </TabButton>
            <TabButton onSelect={() => handleSelect("jsx")}>JSX</TabButton>
            <TabButton onSelect={() => handleSelect("props")}>Props</TabButton>
            <TabButton onSelect={() => handleSelect("state")}>State</TabButton>
          </menu>
          {/* **No Update**: `{tabContent}` displays the initial value and won't update because `tabContent` isn't state. */}
          {tabContent}
        </section>
      </main>
    </div>
  );
}

export default App;
