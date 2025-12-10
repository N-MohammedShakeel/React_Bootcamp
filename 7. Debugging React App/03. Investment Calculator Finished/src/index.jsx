import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode:
  // - A development-only tool that highlights potential problems.
  // - Runs certain functions twice (like component initialization) to detect side effects.
  // - Does NOT affect production builds.
  <StrictMode>
    <App />
  </StrictMode>
);
