## SocketIO-Drawing-Game

#### ESLint

- ESLint는 코드를 보다 일관되게 만들고 버그를 방지하기 위해 ECMAScript/JavaScript 코드에 있는 패턴을 식별하고 보고하는 도구이다.
- 여러 가지 면에서 JSLint 및 JSHint와 유사하지만 몇 가지 다른점이 있다.
- ESLint는 JavaScript 구문 분석에 Espree를 사용한다.
- ESLint는 AST를 사용하여 코드의 패턴을 평가한다.
- ESLint는 완벽하게 플러그가 가능하며, 모든 규칙은 플러그인이며 런타임에 더 추가할 수 있다.

#### ESLint 설치

```javascript
npm install eslint -D
```

#### ESLint 셋업

- eslint --init를 실행하게 되면 .eslintrc파일이 생성되고, 이 파일 안에 설정들을 할 수 있다.

```javascript
npx eslint --init
또는
yarn run eslint --init
```

#### ESLint Rules

- https://eslint.org/docs/rules

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