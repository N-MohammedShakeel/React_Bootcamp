import { useState } from "react";

import { CORE_CONCEPTS } from "./data.js";
import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx";
import TabButton from "./components/TabButton.jsx";
import { EXAMPLES } from "./data.js";

function App() {
  // **useState for Conditional Rendering**
  // - useState manages `selectedTopic` to track the clicked button.
  // - Initial value is undefined, so no topic is selected initially.
  const [selectedTopic, setSelectedTopic] = useState();

  // **Event Handler for Button Clicks**
  // - Updates `selectedTopic` with the clicked button's value (e.g., 'components').
  // - Triggers re-render to show new content.
  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', 'state'
    setSelectedTopic(selectedButton);
  }

  console.log("APP COMPONENT EXECUTING");

  // **Conditional Rendering with Variable**
  // - `tabContent` holds JSX based on `selectedTopic`.
  // - If `selectedTopic` is falsy (undefined), shows default message.
  // - If truthy, shows dynamic content from `EXAMPLES` using `selectedTopic` as key.
  // - This approach stores conditional JSX in a variable for clarity.
  let tabContent = <p>Please select a topic.</p>;

  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }

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
            // **Button Interactions** // - Each TabButton passes a unique value
            to `handleSelect` via `onSelect`. // - Clicking updates
            `selectedTopic`, triggering re-render with new `tabContent`.
            <TabButton onSelect={() => handleSelect("components")}>
              Components
            </TabButton>
            <TabButton onSelect={() => handleSelect("jsx")}>JSX</TabButton>
            <TabButton onSelect={() => handleSelect("props")}>Props</TabButton>
            <TabButton onSelect={() => handleSelect("state")}>State</TabButton>
          </menu>
          // **Rendering Conditional Content** // - `{tabContent}` displays the
          JSX from `tabContent`, updated based on `selectedTopic`.
          {tabContent}
        </section>
      </main>
    </div>
  );
}

export default App;
