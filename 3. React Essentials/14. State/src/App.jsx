// **Importing useState Hook**
// - Hooks are special functions provided by React to add functionality like state or side effects to functional components.
// - `useState` is a hook that lets you add and manage state in functional components.
import { useState } from "react";

import { CORE_CONCEPTS } from "./data.js";
import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx";
import TabButton from "./components/TabButton.jsx";

function App() {
  // **What is State?**
  // - State is data managed by React that, when changed, triggers a component re-render to update the UI.
  // - Unlike regular variables, state persists across renders and notifies React to refresh the UI.

  // **useState Hook**
  // - `useState` creates a state variable and a setter function to update it.
  // - Syntax: `const [state, setState] = useState(initialValue);`
  // - Returns: An array with two elements:
  //   1. `state` (e.g., `selectedTopic`): The current state value.
  //   2. `setState` (e.g., `setSelectedTopic`): A function to update the state, triggering a re-render.
  // - Why Needed? To make UI dynamic (e.g., update `selectedTopic` when a button is clicked).
  const [selectedTopic, setSelectedTopic] = useState("Please click a button");

  // **Using State in Event Handler**
  // - `setSelectedTopic` updates `selectedTopic` state, causing the component to re-render with the new value.
  // - This fixes the earlier issue where the UI didn’t update with a regular variable.
  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', 'state'
    setSelectedTopic(selectedButton);
    // console.log(selectedTopic); // Note: Logs old value; state updates are async.
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
            {/* **State in Action**
                - Each TabButton calls `handleSelect` with a unique value, updating `selectedTopic` via `setSelectedTopic`.
                - This triggers a re-render, updating `{selectedTopic}` in the UI. */}
            <TabButton onSelect={() => handleSelect("components")}>
              Components
            </TabButton>
            <TabButton onSelect={() => handleSelect("jsx")}>JSX</TabButton>
            <TabButton onSelect={() => handleSelect("props")}>Props</TabButton>
            <TabButton onSelect={() => handleSelect("state")}>State</TabButton>
          </menu>
          {/* **Displaying State**
              - `{selectedTopic}` shows the current state value, updating automatically when `setSelectedTopic` is called. */}
          {selectedTopic}
        </section>
      </main>
    </div>
  );
}

export default App;
