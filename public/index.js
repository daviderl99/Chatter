let socket = io.connect("http://localhost:3000");

window.onload = () => {
  let sendBtn = document.getElementById("send-button");
  sendBtn.addEventListener("click", sendMessage);
}

const sendMessage = () => {
  message = document.getElementById("message-input").value;
  document.getElementById("message-input").value = "";
  socket.emit("message", message);
}

// Incoming message
socket.on("message", (message) => {
  let container = document.getElementById("output");
  let div = document.createElement("div");
  let content = document.createTextNode(message);
  div.appendChild(content);
  container.appendChild(div);
});