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

// socketIO()메서드에 Node HTTP Server를 전달해서 새로운 소켓 서버를 생성
const socketServer = socketIO(server);

let socketArray = [];

// 소켓 서버(io)에 connection이벤트가 발생하면 콜백함수를 실행하고, 콜백함수는 socket객체를 받는다.
// socket객체에는 가장 최근에 연결된 하나의 소켓 클라이언트이거나, 또는 소켓 클라이언트로부터 이벤트를 받은 소켓 서버이다.
// 즉, socket객체는 소켓 클라이언트가 될 수도 있고, 소켓 서버가 될 수도 있다.
socketServer.on("connection", (socket) => {
  console.log("🚀 Connected Socket.IO");
  socketArray.push(socket.id);
  console.log("🚀 All Sockets Connected", socketArray);

  socket.broadcast.emit("hello");

  socket.on("helloGuys", () => console.log("helloGuys!!!!"));
});
