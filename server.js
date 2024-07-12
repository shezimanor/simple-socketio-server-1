import { Server } from 'socket.io';

const port = 3000;
// io: Server Instance
const io = new Server(port, {
  // https://socket.io/docs/v4/handling-cors/
  cors: {
    origin: 'http://localhost:5173'
  }
});

const users = {};

io.on('connection', (socket) => {
  // socket: Server Socket
  console.log(`A new user connected with id: ${socket.id}`);
  // 觸發事件
  socket.emit('message', 'Welcome My SocketIO universe!');

  // 註冊事件: message
  socket.on('message', (msg) => {
    console.log(`伺服器收到來自[${socket.id}]的訊息：「${msg}」`);
    // 觸發事件（這兩個 message 互不相關）
    socket.emit('message', `我得到你的訊息了，訊息是「${msg}」`);
  });

  // 註冊事件: greeting
  socket.on('greeting', (msg) => {
    console.log(`伺服器收到來自[${socket.id}]的 "greeting"：「${msg}」`);
  });

  // 註冊事件: send_user_info
  socket.on('send_user_info', (userInfo) => {
    console.log(`伺服器收到來自[${socket.id}]的 "send_user_info"：${userInfo}`);
    // 加入新的 user
    users[`${socket.id}`] = userInfo;
    console.log('Now users: ', users);
  });
});
