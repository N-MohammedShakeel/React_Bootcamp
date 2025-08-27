// **TabButton.jsx**

// **Passing Event Handlers via Props**
// - Event handlers (like `onSelect`) can be passed as props from a parent component (App) to a child (TabButton).
// - This allows the parent to control what happens when an event (e.g., click) occurs in the child.
// - Enables centralized logic in the parent, making it easier to manage which button was clicked.

export default function TabButton({ children, onSelect }) {
  return (
    <li>
      {/* **Using the Passed Handler**
          - `onClick={onSelect}` uses the `onSelect` function passed from App.
          - When the button is clicked, it triggers the parent’s `handleSelect` function.
          - This makes TabButton reusable, as the parent decides the click behavior. */}
      <button onClick={onSelect}>{children}</button>
    </li>
  );
}
