// **TabButton.jsx**

// **Usage in TabButton**
// - {children} in JSX renders the passed content (e.g., 'Components', 'JSX') inside the button.
// - Makes TabButton reusable for any button label without hardcoding.
export default function TabButton({ children }) {
  return (
    <li>
      <button>{children}</button>
    </li>
  );
}
