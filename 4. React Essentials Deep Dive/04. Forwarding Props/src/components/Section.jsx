// **Props Forwarding in Section**
// - The `Section` component accepts `title`, `children`, and `...props` (rest operator).
// - `...props` captures any additional props (e.g., `id`, `className`) passed to `Section`.
// - `<section {...props}>` spreads these props onto the `<section>` element, applying attributes like `id="examples"`.
// - **Why Use?** Makes `Section` reusable for any `<section>` with varying attributes, avoiding repetitive prop definitions.
// - `children` renders nested content (e.g., `<menu>` and `tabContent`), while `title` is used for the heading.
export default function Section({ title, children, ...props }) {
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
