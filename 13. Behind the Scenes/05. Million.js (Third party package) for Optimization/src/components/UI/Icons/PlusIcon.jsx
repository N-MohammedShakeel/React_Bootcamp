import { log } from "../../../log.js";

/*
  million-ignore
  ==============
  - Tells Million.js to SKIP optimizing this component
  - Useful for:
    • tiny components
    • icons
    • components that don't benefit from fine-grained diffing

  Million focuses optimization effort where it matters most.
*/

// million-ignore
export default function PlusIcon(props) {
  log("<PlusIcon /> rendered", 3);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}
