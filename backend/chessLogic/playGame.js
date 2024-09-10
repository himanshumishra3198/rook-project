function playGame(
  io,
  roomId,
  player1,
  player2,
  chess,
  player1Color,
  player2Color
) {
  player1.on("moveMade", function (move, callback) {
    try {
      if (chess.turn() != move.playerColor[0])
        throw new Error("Not your turn!");
      chess.move({ from: move.from, to: move.to, promotion: move.promotion });

      io.to(roomId).emit("updateMove", {
        board: chess.fen(),
        currentTurn: chess.turn() === "w" ? "white" : "black",
      });
      console.log("move Made");
      callback(null);
    } catch (e) {
      callback(e);
    }
  });
}

module.exports = {
  playGame,
};
