import { use } from "react";

import { Opinion } from "./Opinion";
import { OpinionsContext } from "../store/opinions-context";

export function Opinions() {
  /*
    use() is a React 19 API.

    It allows consuming:
      - context
      - promises
      - async values

    Here:
      - It replaces useContext
      - Works synchronously
  */
  const { opinions } = use(OpinionsContext);

  return (
    <div id="opinions">
      <h2>User Opinions</h2>

      {opinions && (
        <ul>
          {opinions.map((o) => (
            <li key={o.id}>
              <Opinion opinion={o} />
            </li>
          ))}
        </ul>
      )}

      {!opinions && (
        <p>No opinions found. Maybe share your opinion on something?</p>
      )}
    </div>
  );
}
