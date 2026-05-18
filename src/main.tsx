import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// StrictMode is off to avoid GSAP double-mount races (same as the Mind site).
createRoot(document.getElementById("root")!).render(<App />);
