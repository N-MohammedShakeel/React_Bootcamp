export default function Button({ children, textOnly, className, ...props }) {
  /*
    ------------------------------------------------------------
    DYNAMIC CSS CLASS HANDLING
    ------------------------------------------------------------

    - textOnly → renders a text-style button
    - default  → renders a normal filled button
  */
  let cssClasses = textOnly ? "text-button" : "button";

  /*
    Allow consumers to add their own classes
  */
  cssClasses += " " + className;

  /*
    Spread ...props allows:
    - onClick
    - type="submit"
    - disabled
    - aria-* attributes
  */
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
