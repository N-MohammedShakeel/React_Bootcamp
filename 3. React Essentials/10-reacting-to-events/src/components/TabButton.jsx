// **Reacting to Events in React**
// - React handles user interactions (like clicks) using event handlers, which are functions triggered by events.
// - Event handlers are attached to JSX elements via props like `onClick`, `onChange`, etc.
// - They allow components to respond dynamically to user actions (e.g., clicks, inputs).

// **Usage in TabButton**
// - The `handleClick` function is defined to log 'Hello World!' when the button is clicked.
// - `onClick={handleClick}` attaches the function to the button’s click event.
// - The `children` prop still renders the button’s content (e.g., 'Components').

export default function TabButton({ children }) {
  // **Event Handler**
  // - `handleClick` is a function that runs when the button is clicked.
  // - Can include any logic (e.g., state updates, API calls, logging).
  function handleClick() {
    console.log("Hello World!");
  }

  return (
    <li>
      {/* **Attaching the Event**
          - `onClick={handleClick}` binds the click event to the `handleClick` function.
          - No parentheses (`handleClick()`) to avoid immediate execution; React calls it on click. */}
      <button onClick={handleClick}>{children}</button>
    </li>
  );
}
