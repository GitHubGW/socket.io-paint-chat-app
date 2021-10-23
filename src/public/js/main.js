const nickname = localStorage.getItem("nickname");
const loginForm = document.querySelector(".loginForm");
const loginButton = document.querySelector(".loginButton");
const container = document.querySelector(".container");

const handleLoginButton = () => {
  const loginInput = document.querySelector(".loginInput");
  localStorage.setItem("nickname", loginInput.value);
};

if (nickname === null) {
  loginForm.classList.remove("hidden");
  loginButton.addEventListener("click", handleLoginButton);
} else {
  container.classList.remove("hidden");
}
