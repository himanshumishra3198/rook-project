const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Globals
const PORT = 3000;

const app = express();

const server = http.createServer(app); // Creating an http server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Or specify your React app's origin if needed
    methods: ["GET", "POST"],
  },
}); // attaching socket.io with the http server
app.use(cors());

// custom requirement related stuff
const { initGame } = require("./chessLogic/initGame");

let waitList = [];

io.on("connection", (socket) => {
  console.log("a new user joined");

  socket.on("joinGame", () => {
    if (waitList.length === 0) {
      waitList.push(socket);
    } else {
      waitList.push(socket);

      initGame(io, waitList);
      waitList = [];
    }
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
