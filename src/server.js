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

const server = app.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});

const socketServer = socketIO(server);

socketServer.on("connection", (socket) => {
  console.log("🚀 Connected Socket.IO");
  console.log("socket", socket);

  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });

  socket.on("clientMessage", ({ message }) => {
    socket.broadcast.emit("serverMessage", { message, nickname: socket.nickname || "User" });
  });
});
