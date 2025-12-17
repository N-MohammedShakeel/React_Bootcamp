import { log } from "../../log.js";

export default function IconButton({ children, icon, ...props }) {
  // Re-renders whenever parent re-renders
  log("<IconButton /> rendered", 2);

  // Component-as-prop pattern
  const Icon = icon;

  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
}
