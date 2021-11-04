const chatList = document.querySelector(".chatList");
const chatForm = document.querySelector(".chatForm");
const chatFormInput = chatForm.querySelector(".chatForm input");
const sendMessageButton = document.querySelector(".sendMessageButton");

// 메세지 전송
const handleSendMessage = (event) => {
  event.preventDefault();
  const chatFormInputValue = chatFormInput.value;
  const li = document.createElement("li");
  li.innerHTML = `You: ${chatFormInputValue}`;
  chatList.appendChild(li);
  chatFormInput.value = "";
  const nickname = localStorage.getItem("nickname");
  window.socketClient.emit("clientMessage", { message: chatFormInputValue, nickname });
};

window.socketClient.on("clientMessage", ({ message, nickname }) => {
  const li = document.createElement("li");
  li.innerHTML = `${nickname}: ${message}`;
  chatList.appendChild(li);
});

if (sendMessageButton) {
  sendMessageButton.addEventListener("click", handleSendMessage);
}
