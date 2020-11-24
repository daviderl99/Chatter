let socket = io();

let sendBtn = document.getElementById("send-button"),
    message = document.getElementById("message-input"),
    output = document.getElementById("output");

window.onload = () => {
  sendBtn.addEventListener("click", sendMessage);
  message.addEventListener("keyup", enterKey);
}

// Incoming message
socket.on("message", ({message, name}) => {
  if (message === "" || name === "") return;
  document.getElementById("message-input").value = "";
  let div = document.createElement("div");
  div.className = "message-box";
  div.innerHTML = `<span>${name}:</span> ${message}`;
  output.appendChild(div);
  scrollBarToBottom();
});

const sendMessage = () => {
  message = document.getElementById("message-input").value;
  name = document.getElementById("name-input").value;
  socket.emit("message", {message, name});
}

const enterKey = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
}

const scrollBarToBottom = () => {
  let chatWindow = document.getElementById("chat-window");
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

const darkMode = () => {
  let root = document.documentElement;
  root.style.setProperty("--body-bg", "#000");
  root.style.setProperty("--text-color", "#DDD");
  root.style.setProperty("--chat-bg", "#111");
  root.style.setProperty("--chat-border", "#000");
  root.style.setProperty("--chat-shadow", "#C8C8C880");
  root.style.setProperty("--msg-color", "#FFF");
  root.style.setProperty("--msg-input-bg", "#222");
  root.style.setProperty("--input-border", "#7F0037");
  root.style.setProperty("--name-input-bg", "#222");
}

const lightMode = () => {
  let root = document.documentElement;
  root.style.setProperty("--body-bg", "#EEE");
  root.style.setProperty("--text-color", "#000");
  root.style.setProperty("--chat-bg", "#F9F9F9");
  root.style.setProperty("--chat-border", "#DDD");
  root.style.setProperty("--chat-shadow", "#0808081A");
  root.style.setProperty("--msg-color", "#000");
  root.style.setProperty("--msg-input-bg", "#FFF");
  root.style.setProperty("--input-border", "#000");
  root.style.setProperty("--name-input-bg", "#FFF");
}