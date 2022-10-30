const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// const { getAllMessages } = require("./database.js");

const PORT = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname, "/index.html");
});

io.sockets.on("connection", (socket) => {
  console.log("New connection: " + socket.id);

  socket.on("message", (data) => {
    io.sockets.emit("message", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.id);
  });
});

http.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});