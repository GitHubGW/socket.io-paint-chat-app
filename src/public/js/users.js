const currentUsers = document.querySelector(".currentUsers");
const currentUsersNickname = document.querySelector(".currentUsersNickname");

window.socketClient.on("allSockets", ({ allSockets }) => {
  currentUsersNickname.innerHTML = "";

  allSockets.forEach((socket) => {
    const h2 = document.createElement("h2");
    h2.classList.add("currentUserNickname");
    h2.innerHTML = `${socket.nickname},`;
    currentUsersNickname.appendChild(h2);
  });

  currentUsers.innerHTML = `👨‍💻 현재 접속중인 유저: ${allSockets.length}명`;
});
