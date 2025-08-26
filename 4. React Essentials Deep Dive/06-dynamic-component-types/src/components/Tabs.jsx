// **Dynamic Component Types**
// - Allows passing a component type (e.g., 'div', 'menu') as a prop (`buttonsContainer`) to dynamically set the HTML element or React component used.
// - **Why Use?** Enhances flexibility, letting the parent (`Examples`) choose the container type for buttons (e.g., `<menu>` instead of `<div>`).
// - **How It Works**: `buttonsContainer` defaults to 'div'. The prop value is assigned to `ButtonsContainer` (capitalized for JSX) and used as a component (`<ButtonsContainer>`).
export default function Tabs({ children, buttons, buttonsContainer = "div" }) {
  // **Dynamic Component Assignment**
  // - `ButtonsContainer` is a variable holding the component type (e.g., 'menu').
  // - In JSX, `<ButtonsContainer>` renders as `<menu>` if `buttonsContainer="menu"`, wrapping the `buttons` prop.
  const ButtonsContainer = buttonsContainer;
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}
