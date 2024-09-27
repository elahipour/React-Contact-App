import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContactProvider from "./context/ContactProvider.jsx";
createRoot(document.getElementById("root")).render(
  <ContactProvider>
    <App />
  </ContactProvider>
);
