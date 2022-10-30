let socket = io();

let sendBtn = document.getElementById("send-button"),
    message = document.getElementById("message-input"),
    name = document.getElementById("name-input"),
    output = document.getElementById("output");

window.onload = () => {
  sendBtn.addEventListener("click", sendMessage);
  name.addEventListener("keyup", saveUsername);
  message.addEventListener("keyup", enterKey);
  message.addEventListener("keyup", typing);

  setUsername();
}

// Incoming message
socket.on("message", ({message, name}) => {
  createMsgDiv(message, name);
  removeUserTyping();
  scrollBarToBottom();
});

// User is typing
socket.on("typing", ({message, name}) => {
  if (message !== ""){
    showUserTyping(name);
  } else {
    removeUserTyping();
  }
});

// Get messages history
// socket.on("messageHistory", (history) => {
//   console.log(history);
//   history.forEach(el => {
//     console.log(el.message, el.username);
//   });
// });

// Emits ----------
const sendMessage = () => {
  message = getMessage();
  name = getUsername();
  if (message !== "" && name !== "") {
    socket.emit("message", {message, name});
  }
  emptyMsgField();
}

const typing = () => {
  name = getUsername();
  message = getMessage();
  socket.emit("typing", {message, name});
}
//---------------

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

const getUsername = () => {
  return document.getElementById("name-input").value;
}

const getMessage = () => {
  return document.getElementById("message-input").value;
}

const emptyMsgField = () => {
  document.getElementById("message-input").value = "";
}

const showUserTyping = (name) => {
  if (name !== "") {
    let div = document.getElementById("feedback");
    div.innerHTML = `<i><span>${name}</span> is typing...</i>`;
  }
}

const removeUserTyping = () => {
  let div = document.getElementById("feedback");
  div.innerHTML = "";
}

const createMsgDiv = (message, name) => {
  let div = document.createElement("div");
  div.className = "message-box";
  div.innerHTML = `<span>${name}:</span> ${message}`;
  output.appendChild(div);
}

const saveUsername = () => {
  localStorage.setItem("username", name.value);
}

const setUsername = () => {
  username = localStorage.getItem("username");
  if (username){
    name.value = username;
  }
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