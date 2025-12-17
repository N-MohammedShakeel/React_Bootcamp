import { memo } from "react";
import { log } from "../../log.js";

/*
  IconButton (memoized)
  ====================
  - Re-renders ONLY if:
    ✔ icon changes
    ✔ children change
    ✔ props reference changes

  Works efficiently because:
  - Parent uses useCallback for onClick
*/
const IconButton = memo(function IconButton({ children, icon, ...props }) {
  log("<IconButton /> rendered", 2);

  const Icon = icon;

  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
});

export default IconButton;
