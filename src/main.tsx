import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeFontOptimization } from "./lib/font-optimization";

// Initialize font optimization before rendering
initializeFontOptimization();

createRoot(document.getElementById("root")!).render(<App />);
