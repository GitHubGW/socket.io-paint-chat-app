const nickname = localStorage.getItem("nickname");
const loginForm = document.querySelector(".loginForm");
const loginButton = document.querySelector(".loginButton");
const container = document.querySelector(".container");

const handleLoginButton = () => {
  const loginInput = document.querySelector(".loginInput");
  localStorage.setItem("nickname", loginInput.value);

  const socketClient = io("http://localhost:4000");
  socketClient.emit("setNickname", { nickname: loginInput.value });
};

if (nickname === null) {
  loginForm.classList.remove("hidden");
  loginButton.addEventListener("click", handleLoginButton);
} else {
  container.classList.remove("hidden");
  const socketClient = io("http://localhost:4000");
  socketClient.emit("setNickname", { nickname });
}
