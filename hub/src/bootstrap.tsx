import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./App";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
}
