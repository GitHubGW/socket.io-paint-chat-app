## SocketIO-Drawing-Game

#### ESLint

- ESLint는 코드를 보다 일관되게 만들고 버그를 방지하기 위해 ECMAScript/JavaScript 코드에 있는 패턴을 식별하고 보고하는 도구이다.
- 여러 가지 면에서 JSLint 및 JSHint와 유사하지만 몇 가지 다른점이 있다.
- ESLint는 JavaScript 구문 분석에 Espree를 사용한다.
- ESLint는 AST를 사용하여 코드의 패턴을 평가한다.
- ESLint는 완벽하게 플러그가 가능하며, 모든 규칙은 플러그인이며 런타임에 더 추가할 수 있다.

#### ESLint 설치 및 셋업

- eslint --init를 실행하게 되면 .eslintrc파일이 생성되고, 이 파일 안에 설정들을 할 수 있다.
- ESLint 규칙: https://eslint.org/docs/rules

```javascript
npm install eslint -D

npx eslint --init 또는 yarn run eslint --init
```

#### Pug에서 script 사용

- Pug파일에서 script를 사용할 때는 script.을 붙여주고, script.내부에 사용할 자바스크립트 코드를 넣어주면 된다.
- 현재 이 프로젝트에서는 io("http://localhost:4000")를 통해 소켓 서버에 연결하고, 해당 함수를 여러 파일에서 자주 사용한다.
- 그렇기 때문에 `window.socketClient=io("http://localhost:4000")`로 window객체에 socketClient라는 변수로 io("http://localhost:4000")를 넣어주게 되면 전역 변수인 window객체를 통해 아래 login.js, message.js 등의 파일에서 불러와서 전역적으로 사용할 수 있다.
- io()메서드는 socket.io.js로부터 오기 때문에 script(src="/socket.io/socket.io.js")보다 뒤에서 script를 통해 불러와야 한다.

```javascript
script(src="/socket.io/socket.io.js")
script.
  window.socketClient=io("http://localhost:4000")
script(src="js/login.js")
script(src="js/message.js")
script(src="js/main.js")
script(src="js/notification.js")
```

#### HTTP

- HTTP 프로토콜의 GET, POST, PUT, PATCH, DELETE 등은 Stateless이다.
- Stateless는 클라이언트가 request를 하게 되면, 서버는 그 request에 대한 response하고 연결은 완전히 종료되는 것을 말한다.
- 또 다른 request를 보낼 때만 서버와 연결되고, 다시 response하면 연결은 다시 끊긴다.
- 서버가 유일하게 클라이언트를 기억하게 하는 방법은 쿠키를 이용하는 방법뿐이다.
- 클라이언트가 쿠키를 서버로 보내서 서버로 하여금 클라이언트를 기억하게 할 수 있다.

#### Web Socket

- Web Socket은 HTTP와는 또다른 소통 방식으로 HTTP처럼 request와 response가 없다.
- Stateful은 웹 소켓이 한 번 request를 받게 되면 클라이언트가 누군인지 기억하고 있고, 연결을 유지하는 것을 말한다.
- 클라이언트와 서버는 게속 연결되어 있기 때문에 서버가 response를 보낼 때 어떤 새로운 통로를 만들 필요없이 현재 연결되어있는 통로로 보내면 된다.
- 이 작업은 서버에 더 많은 메모리를 요구하게 되는데 이유는 서버가 현재 연결되어있는 모든 클라이언트를 기억해야 하기 때문이다.
- 웹 소켓에는 쿠키 같은 것이 없고, 클라이언트와 서버는 계속 연결이 유지된 채로 있게 된다.

#### Socket.IO

- Socket.IO는 웹 소켓 어플리케이션 개발을 위한 엔진이다.
- Socket.IO를 사용하면 실시간 분석이나 실시간 메시지, 채팅, 바이너리 스트리밍, 문서 공동 작업 등을 할 수 있다.
- Socket.IO외에 ws라는 엔진도 있는데 마찬가지로 웹 소켓 클라이언트와 서버를 만들 수 있다.
- https://socket.io

#### Socket.IO 클라이언트, 서버 연결

- Socket.IO를 통해 클라이언트와 서버를 연결해준다.
- 양쪽 모두 Socket.IO에 연결되어 있어야 통신할 수 있다.

#### Socket.IO 함수

1. on(): on메서드를 사용해면 소켓 클라이언트와 소켓 서버에게 이벤트를 듣게 한다.
- socketServer.on("connection")은 소켓 서버에게 connection이라는 이벤트를 듣게 한다.
- 그래서 소켓 클라이언트가 소켓 서버에 연결되서 connection 이벤트가 발생하면 콜백함수가 실행된다.

2. emit(): emit메서드를 사용하면 소켓 클라이언트가 소켓 서버에게, 또는 소켓 서버가 소켓 클라이언트에게 이벤트를 보낼 수 있다.
- server.js의 socketServer.on()안에서 socket.emit("hello")은 방금 연결된 소켓에게 hello라는 이벤트를 보낸다.
- 방금 연결된 소켓에게 hello라는 이벤트를 보내면, hello라는 이벤트를 듣고 있는 소켓 클라이언트가 있다면 반응하게 된다.
- 소켓 클라이언트에서도 마찬가지로 socketClient.emit("hello2")를 통해 hello2라는 이벤트를 소켓 서버에 보낼 수 있다.
- https://socket.io/docs/v4/emitting-events/#basic-emit

3. broadcast.emit(): broadcast.emit메서드를 사용하면 방금 연결된 소켓을 제외하고, 현재 연결되어있는 나머지 소켓들에게 이벤트를 보낸다.
- socket.broadcast.emit("hello")은 방금 연결된 소켓을 제외한 나머지 모든 소켓들에게 hello 이벤트를 보낸다.
- https://socket.io/docs/v4/broadcasting-events

4. socketIO(server)를 통해 생성한 socketServer또한 emit메서드를 사용할 수 있다.
- socketServer.emit()을 통해 이벤트를 전달하게 되면 연결되어 있는 모든 전체 소켓에 이벤트를 보낼 수 있다.
- 위의 emit이나 broadcast.emit은 방금 연결된 소켓이나, 방금 연결된 소켓을 제외한 다른 모든 소켓들에게만 이벤트를 전달할 수 있는데, 모든 전체 소켓에 이벤트를 보내고 싶다면 socketServer를 이용해서 emit을 해주면 된다.

```javascript
const socketServer = socketIO(server)

socketServer.emit("allUsers", { allSockets })
```

### Chat

- Socket.IO를 이용해서 간단한 채팅을 만들었다.
- server.js는 소켓 서버이고, index.js는 소켓 클라이언트이다.

#### server.js (Socket Server)

```javascript
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

// 소켓 서버(io)에 connection이벤트가 발생하면 콜백함수를 실행하고, 콜백함수는 socket객체를 받는다.
// socket객체에는 가장 최근에 연결된 하나의 소켓 클라이언트이거나, 또는 소켓 클라이언트로부터 이벤트를 받은 소켓 서버이다.
// 즉, socket객체는 소켓 클라이언트가 될 수도 있고, 소켓 서버가 될 수도 있다.
socketServer.on("connection", (socket) => {
  console.log("🚀 Connected Socket.IO");

  // 소켓 클라이언트로부터 setNickname 이벤트를 듣게 되면, 전달받은 nickname을 이용해서 현재 이 setNickname이벤트를 보낸 socket에 nickname프로퍼티의 nickname값을 추가한다.
  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });

  // 소켓 클라이언트로부터 clientMessage 이벤트를 듣게 되면, 전달받은 message와 nickname을 socket.broadcast.emit()를 이용해서 방금 이 이벤트를 보낸 소켓 클라이언트를 제외한 나머지 모든 소켓 클라이언트에게 이벤트를 보낸다.
  // nickname에는 현재 이 이벤트를 보낸 소켓 클라이언트가 가지고 있는 nickname인 socket객체안에 nickname값을 넣어서 보낸다.
  socket.on("clientMessage", ({ message }) => {
    socket.broadcast.emit("serverMessage", { message, nickname: socket.nickname || "User" });
  });
});
```

#### index.js (Socket Client)

```javascript
// 클라이언트 쪽에서 io()메서드를 사용해서 /주소로 request를 보내서 소켓 서버와 연결한다.
// io()메서드는 Socket.IO가 주는 함수로, <script src="/socket.io/socket.io.js"></script>를 통해 socket.io.js파일을 로드해오게 되면 사용할 수 있다.
// 소켓 클라이언트와 소켓 서버를 연결시킨 것이다.
const socketClient = io("/");

// 소켓 서버로 닉네임을 보내는 함수
// 함수의 인자로 nickname을 받아서 socketClient.emit("setNickname", { nickname })를 통해 setNickname이라는 이벤트를 전달받은 nickname과 함께 소켓 서버로 보낸다.
const setNickname = (nickname) => {
  socketClient.emit("setNickname", { nickname });
};

// 소켓 서버로 메세지를 보내는 함수
// 함수의 인자로 message를 clientMessage이벤트와 전달받은 message를 소켓 서버에 보낸다.
const sendMessage = (message) => {
  socketClient.emit("clientMessage", { message });
  console.log(`You:${message}`);
};

// 소켓 서버로부터 메세지를 받는 함수
// 소켓 클라이언트는 serverMessage라는 이벤트를 듣고 있다가, 이벤트를 받게 되면 같이 전달된 message, nickname을 출력한다.
socketClient.on("serverMessage", ({ message, nickname }) => {
  console.log(`${nickname}: ${message}`);
});
```

#### home.pug

```javascript
doctype html
html(lang="ko")
  head
    meta(charset="UTF-8")
    meta(http-equiv="X-UA-Compatible", content="IE=edge")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title Drawing Game
  body 
    h1 Home

  // http://localhost:4000/socket.io/socket.io.js 
  // 위의 주소를 들어가보면 socket.io.js파일이 있는데 해당 파일을 클라이언트 쪽에 import해서 클라이언트를 socket.io에 연결시킨다.
  script(src="/socket.io/socket.io.js")
  script(src="index.js")
```

