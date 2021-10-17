// 클라이언트 쪽에서 io()메서드를 사용해서 /주소로 request를 보내서 소켓 서버와 연결한다.
// io()메서드는 Socket.IO가 주는 함수로, <script src="/socket.io/socket.io.js"></script>를 통해 socket.io.js파일을 로드해오게 되면 사용할 수 있다.
// 소켓 클라이언트와 소켓 서버를 연결시킨 것이다.
const socketClient = io("/");

socketClient.on("hello", (socket) => {
  console.log("socketClient");
});

socketClient.emit("helloGuys");
