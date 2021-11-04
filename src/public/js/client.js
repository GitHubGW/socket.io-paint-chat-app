const notification = document.querySelector(".notification");
const chatList = document.querySelector(".chatList");
const chatForm = document.querySelector(".chatForm");
const chatFormInput = chatForm.querySelector(".chatForm input");
const sendMessageButton = document.querySelector(".sendMessageButton");
const socketClient = io("http://localhost:4000");

// 메세지 전송
const handleSendMessage = (event) => {
  event.preventDefault();
  const chatFormInputValue = chatFormInput.value;
  const li = document.createElement("li");
  li.innerHTML = `You: ${chatFormInputValue}`;
  chatList.appendChild(li);
  chatFormInput.value = "";
  const nickname = localStorage.getItem("nickname");
  socketClient.emit("clientMessage", { message: chatFormInputValue, nickname });
};

// 알림
const handleNotification = (text, color) => {
  const div = document.createElement("div");
  div.innerText = text;
  div.style.backgroundColor = color;
  notification.appendChild(div);
};

socketClient.on("clientMessage", ({ message, nickname }) => {
  const li = document.createElement("li");
  li.innerHTML = `${nickname}: ${message}`;
  chatList.appendChild(li);
});

socketClient.on("joinUser", ({ nickname }) => {
  handleNotification(`${nickname}님이 들어왔습니다.`, "lightgreen");
});

socketClient.on("disconnected", ({ nickname }) => {
  handleNotification(`${nickname}님이 나갔습니다.`, "crimson");
});

if (sendMessageButton) {
  sendMessageButton.addEventListener("click", handleSendMessage);
}
