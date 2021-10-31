const nickname = localStorage.getItem("nickname");
const loginForm = document.querySelector(".loginForm");
const loginButton = document.querySelector(".loginButton");
const container = document.querySelector(".container");

// 닉네임 설정 및 알림
const handleLoginButton = (event) => {
  event.preventDefault();
  const loginInput = document.querySelector(".loginInput");
  const loginInputValue = loginInput.value;
  loginInput.value = "";
  localStorage.setItem("nickname", loginInputValue);
  loginForm.classList.add("hidden");
  const socketClient = io("http://localhost:4000");
  socketClient.emit("joinUser", { nickname: loginInputValue });
};

if (nickname === null) {
  loginForm.classList.remove("hidden");
  loginButton.addEventListener("click", handleLoginButton);
} else {
  container.classList.remove("hidden");
  const socketClient = io("http://localhost:4000");
  socketClient.emit("joinUser", { nickname });
}
