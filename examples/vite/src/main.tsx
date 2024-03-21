import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SharedRootLayout } from "shared-ui";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error('Element with id="root" not found.');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <SharedRootLayout>
      <App />
    </SharedRootLayout>
  </React.StrictMode>,
);
