import { useState } from "react";

import { CORE_CONCEPTS } from "./data.js";
import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx";
import TabButton from "./components/TabButton.jsx";
import { EXAMPLES } from "./data.js";

function App() {
  // **State for Derived Output**
  // - `selectedTopic` state determines which example content to display.
  // - Initialized to 'components' to show default content on load.
  const [selectedTopic, setSelectedTopic] = useState("components");

  // **Handler for State Update**
  // - Updates `selectedTopic` when a TabButton is clicked, triggering a re-render.
  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', 'state'
    setSelectedTopic(selectedButton);
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
            {/* **Button Interactions**
                - Each TabButton updates `selectedTopic` via `handleSelect`, controlling the derived output below. */}
            <TabButton onSelect={() => handleSelect("components")}>
              Components
            </TabButton>
            <TabButton onSelect={() => handleSelect("jsx")}>JSX</TabButton>
            <TabButton onSelect={() => handleSelect("props")}>Props</TabButton>
            <TabButton onSelect={() => handleSelect("state")}>State</TabButton>
          </menu>
          {/* **Deriving Output from State**
              - The UI is derived from `selectedTopic` state, accessing `EXAMPLES[selectedTopic]` to display title, description, and code.
              - **Why Derive?** Avoids duplicating state; `EXAMPLES` data is static, and `selectedTopic` determines which subset to show.
              - Updates automatically when `selectedTopic` changes, ensuring dynamic, reactive UI. */}
          <div id="tab-content">
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
              <code>{EXAMPLES[selectedTopic].code}</code>
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
