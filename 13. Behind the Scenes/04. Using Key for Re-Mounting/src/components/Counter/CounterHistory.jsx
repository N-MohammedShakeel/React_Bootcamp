import { useState } from "react";
import { log } from "../../log.js";

function HistoryItem({ count }) {
  log("<HistoryItem /> rendered", 3);

  /*
    Local state inside a list item.
    This state MUST stay associated with the correct data item.
  */
  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prev) => !prev);
  }

  return (
    <li onClick={handleClick} className={selected ? "selected" : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log("<CounterHistory /> rendered", 2);

  return (
    <ol>
      {history.map((count) => (
        /*
          ✅ CORRECT KEY USAGE
          ===================
          key={count.id}

          Why this matters:
          - React uses keys to match old & new elements
          - Stable ids ensure correct component-instance matching
          - Local state (selected) stays with the correct history entry

          ❌ If index were used as key:
          - Adding items at the start shifts indices
          - React reuses wrong component instances
          - "selected" state jumps to another item (BUG)
        */
        <HistoryItem key={count.id} count={count.value} />
      ))}
    </ol>
  );
}
