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
let allSockets = [];

socketServer.on("connection", (socketClient) => {
  console.log("🚀 Connected Socket.IO");

  socketClient.on("joinUser", ({ nickname }) => {
    allSockets.push({ id: socketClient.id, nickname });
    socketClient.nickname = nickname;
    socketClient.broadcast.emit("joinUser", { nickname });
    socketServer.emit("allSockets", { allSockets });
  });

  socketClient.on("disconnect", () => {
    if (socketClient.nickname !== undefined) {
      allSockets = allSockets.filter((socketObject) => socketObject.id !== socketClient.id);
      socketClient.broadcast.emit("disconnected", { nickname: socketClient.nickname });
      socketServer.emit("allSockets", { allSockets });
    }
  });

  socketClient.on("clientMessage", ({ message, nickname }) => {
    socketClient.broadcast.emit("clientMessage", { message, nickname });
  });

  socketClient.on("beginPath", ({ offsetX, offsetY }) => {
    socketClient.broadcast.emit("beganPath", { offsetX, offsetY });
  });

  socketClient.on("strokePath", ({ offsetX, offsetY, strokeStyle }) => {
    socketClient.broadcast.emit("strokedPath", { offsetX, offsetY, strokeStyle });
  });

  socketClient.on("fill", ({ fillStyle }) => {
    socketClient.broadcast.emit("filled", { fillStyle });
  });

  socketClient.on("reset", ({ fillStyle }) => {
    socketClient.broadcast.emit("reseted", { fillStyle });
  });

  socketClient.on("lineWidth", ({ lineWidth }) => {
    socketClient.broadcast.emit("linedWidth", { lineWidth });
  });
});
