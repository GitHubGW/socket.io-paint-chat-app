const sendMessageButton = document.querySelector(".sendMessageButton");
const notification = document.querySelector(".notification");
const socketClient = io("http://localhost:4000");

// 메세지 전송
const handleSendMessage = (message) => {
  socketClient.emit("clientMessage", { message });
  console.log(`You:${message}`);
};

// 알림
const handleNotification = (text, color) => {
  const div = document.createElement("div");
  div.innerText = text;
  div.style.backgroundColor = color;
  notification.appendChild(div);
};

socketClient.on("sendMessage", ({ message, nickname }) => {
  console.log(`${nickname}: ${message}`);
});

socketClient.on("joinUser", ({ nickname }) => {
  console.log("joinUser:", nickname);
  handleNotification(`${nickname} just joined.`, "lightgreen");
});

socketClient.on("disconnected", ({ nickname }) => {
  console.log("disconnected:", nickname);
  handleNotification(`${nickname} just lefted.`, "crimson");
});

if (sendMessageButton) {
  sendMessageButton.addEventListener("click", handleSendMessage);
}
