const { Chess } = require("chess.js");
const { playGame } = require("./playGame");
function initGame(io, players) {
  const player1 = players[0];
  const player2 = players[1];

  // Create a unique room id by combining the two socket ids
  const roomId = `${player1.id}-${player2.id}`;

  // Make both players join the same room
  player1.join(roomId);
  player2.join(roomId);

  // Initialize the chess game using chess.js
  const chess = new Chess();

  // Assign players their colors
  const player1Color = "white";
  const player2Color = "black";

  // Notify both players that the game has started and provide the initial game state
  player1.emit("gameStarted", {
    gameOn: true,
    roomId: roomId,
    board: chess.fen(), // FEN notation of the initial board state
    playerColor: player1Color,
    currentTurn: "white", // White always starts first in chess
  });

  player2.emit("gameStarted", {
    gameOn: true,
    roomId: roomId,
    board: chess.fen(), // FEN notation of the initial board state
    playerColor: player2Color,
    currentTurn: "white", // White always starts first in chess
  });
  console.log(chess.ascii());

  playGame(io, roomId, player1, player2, chess, player1Color, player2Color);

  console.log(`Game initialized with Room ID: ${roomId}`);
}

module.exports = {
  initGame,
};
