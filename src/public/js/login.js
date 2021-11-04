const nickname = localStorage.getItem("nickname");
const notification = document.querySelector(".notification");
const loginForm = document.querySelector(".loginForm");
const loginButton = document.querySelector(".loginButton");
const container = document.querySelector(".container");

// 유저 닉네임 설정
const handleLoginButton = (event) => {
  event.preventDefault();
  const loginInput = document.querySelector(".loginInput");
  const loginInputValue = loginInput.value;
  loginInput.value = "";
  localStorage.setItem("nickname", loginInputValue);
  loginForm.classList.add("hidden");
  container.classList.remove("hidden");
  window.socketClient.emit("joinUser", { nickname: loginInputValue });
};

// 유저 입장, 퇴장 알림
const handleNotification = (text, color) => {
  const div = document.createElement("div");
  div.innerText = text;
  div.style.backgroundColor = color;
  notification.appendChild(div);
};

window.socketClient.on("joinUser", ({ nickname }) => handleNotification(`${nickname}님이 들어왔습니다.`, "dodgerblue"));
window.socketClient.on("disconnected", ({ nickname }) => handleNotification(`${nickname}님이 나갔습니다.`, "crimson"));

if (nickname === null) {
  loginForm.classList.remove("hidden");
  loginButton.addEventListener("click", handleLoginButton);
} else {
  container.classList.remove("hidden");
  window.socketClient.emit("joinUser", { nickname });
}
