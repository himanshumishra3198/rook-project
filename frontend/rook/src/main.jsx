import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DndProvider } from "react-dnd"; // Import DndProvider
import { HTML5Backend } from "react-dnd-html5-backend"; // Import the HTML5 drag-and-drop backend
import App from "./App.jsx";
import "./index.css";
import { GameProvider } from "./context/GameContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <GameProvider>
        <App />
      </GameProvider>
    </DndProvider>
  </StrictMode>
);
