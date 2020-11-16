let socket;

socket = io.connect("http://localhost:3000");

const sendMessage = () => {
  message = document.getElementById("text").value;
  document.getElementById("text").value = "";
  socket.emit("message", message);
}

// Incoming message
socket.on("message", (message) => {
  let container = document.getElementById("messages");
  let div = document.createElement("div");
  let content = document.createTextNode(message);
  div.appendChild(content);
  container.appendChild(div);
});