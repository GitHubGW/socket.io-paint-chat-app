import express from "express";
import socketIO from "socket.io";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.static(`${process.cwd()}/src/public`));

app.get("/", (req, res) => res.render("home"));

const handleListening = () => {
  console.log(`🚀 http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleListening);

// socketIO()메서드에 Node HTTP Server를 전달해서 새로운 소켓 서버를 생성
const io = socketIO(server);
