import express from "express";
import socketIO from "socket.io";
import morgan from "morgan";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.static(`${process.cwd()}/src/public`));
app.get("/", (req, res) => res.render("home"));

const server = app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
const socketServer = socketIO(server);

socketServer.on("connection", (socketClient) => {
  console.log("🚀 Connected Socket.IO");

  socketClient.on("joinUser", ({ nickname }) => {
    socketClient.nickname = nickname;
    socketClient.broadcast.emit("joinUser", { nickname });
  });

  socketClient.on("sendMessage", ({ message }) => {
    socketClient.broadcast.emit("sendMessage", { message, nickname: socketClient.nickname });
  });

  socketClient.on("disconnect", () => {
    if (socketClient.nickname !== undefined) {
      socketClient.broadcast.emit("disconnected", { nickname: socketClient.nickname });
    }
  });
});
