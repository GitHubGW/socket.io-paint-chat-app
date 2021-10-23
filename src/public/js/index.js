// import { io } from "socket.io-client";

const socketClient = io("http://localhost:4000/");

const setNickname = (nickname) => {
  socketClient.emit("setNickname", { nickname });
};

const sendMessage = (message) => {
  socketClient.emit("clientMessage", { message });
  console.log(`You:${message}`);
};

socketClient.on("serverMessage", ({ message, nickname }) => {
  console.log(`${nickname}: ${message}`);
});
