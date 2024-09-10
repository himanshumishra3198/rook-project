import { createContext, useContext } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
const GameContext = createContext();

export function GameProvider({ children }) {
  let [gameState, setGameState] = useState({
    gameOn: false,
    board: null,
    playerColor: null,
    currentTurn: null,
    roomId: null,
  });
  let [socket, setSocket] = useState(io("http://localhost:3000"));
  return (
    <GameContext.Provider
      value={{ gameState, setGameState, socket, setSocket }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
