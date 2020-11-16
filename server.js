const express = require("express");
const socket = require("socket.io");

const app = express();
const server = app.listen(3000);
const io = socket(server);

app.use(express.static("public"));

io.sockets.on("connection", (socket) => {
  console.log("New connection: " + socket.id);

  socket.on("message", (message) => {
    io.sockets.emit("message", message);
  });
});

console.log("Socket server is running");