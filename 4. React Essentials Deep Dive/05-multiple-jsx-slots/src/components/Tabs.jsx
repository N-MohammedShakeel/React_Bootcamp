// **Multiple JSX Slots**
// - JSX slots refer to passing different pieces of JSX content to a component via props.
// - Here, `Tabs` accepts `buttons` (for the menu) and `children` (for the content area) as separate props.
// - **Why Use?** Allows flexible composition, letting the parent (Examples) control what goes where in `Tabs`.
// - Each slot (`buttons`, `children`) is rendered in a specific part of the component, improving modularity.
export default function Tabs({ children, buttons }) {
  return (
    <>
      // **Buttons Slot** // - `buttons` prop holds JSX for the menu (e.g.,
      TabButton components). // - Rendered inside `<menu> </menu>` to group
      buttons.
      <menu>{buttons}</menu>
      // **Children Slot** // - `children` prop holds the main content (e.g.,
      tabContent). // - Rendered below the menu for dynamic content display.
      {children}
    </>
  );
}
