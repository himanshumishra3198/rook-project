import { useGame } from "../context/GameContext";
import { Chessboard } from "react-chessboard"; // Import Chessboard from react-chessboard
import { useEffect } from "react";

function Board() {
  const { socket, gameState, setGameState } = useGame();
  console.log(gameState.board);
  useEffect(() => {
    // Listen for the "updateMove" event from the server
    socket.on("updateMove", (data) => {
      setGameState((prevGameState) => ({
        ...prevGameState,
        board: data.board,
        currentTurn: data.currentTurn,
      }));
    });

    // Cleanup the listener on component unmount
  }, [socket, setGameState]);

  // Function to handle a move made on the board
  const onDrop = (sourceSquare, targetSquare) => {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      playerColor: gameState.playerColor,
      promotion: "q", // You can specify promotion to queen (as an example)
    };

    // Call the backend or validate the move here
    // For simplicity, just update the board state
    // const updatedBoard = gameState.chess.move(move); // Assuming `chess` is your Chess.js instance
    socket.emit("moveMade", move, (error) => {
      if (error) {
        console.log(error);
        return false;
      }
    });
  };

  return (
    <div>
      <Chessboard
        position={gameState.board}
        onPieceDrop={onDrop}
        boardWidth={400}
      />
    </div>
  );
}

export default Board;
