import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import Board from "./components/Board";
import { useGame } from "./context/GameContext";

function App() {
  let { socket, gameState, setGameState } = useGame();

  function joinGame() {
    socket.emit("joinGame");
  }
  useEffect(() => {
    socket.on("gameStarted", (data) => {
      setGameState({
        gameOn: data.gameOn,
        board: data.board,
        roomId: data.roomId,
        playerColor: data.playerColor,
        currentTurn: data.currentTurn,
      });
    });
  }, [socket]);

  return (
    <div className="flex">
      {gameState.gameOn ? (
        <Board />
      ) : (
        <div
          style={{ cursor: "pointer" }}
          className="bg-red-500 p-4 rounded-md m-12 shadow-lg hover:bg-red-800 text-white"
          onClick={joinGame}
        >
          Create Game
        </div>
      )}
    </div>
  );
}

export default App;
