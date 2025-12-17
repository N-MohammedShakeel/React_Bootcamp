import { log } from "../../log.js";

export default function CounterOutput({ value }) {
  // Re-renders whenever parent passes a new value
  log("<CounterOutput /> rendered", 2);

  // Derived UI from props
  const cssClass = value >= 0 ? "counter-output" : "counter-output negative";

  return <span className={cssClass}>{value}</span>;
}
