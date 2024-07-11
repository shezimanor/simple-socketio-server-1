import { Server } from 'socket.io';

const port = 3000;
// io: Server Instance
const io = new Server(port, {
  // https://socket.io/docs/v4/handling-cors/
  cors: {
    origin: 'http://localhost:5173'
  }
});

io.on('connection', (socket) => {
  // socket: Server Socket
  console.log(`A new user connected with id: ${socket.id}`);
  // 註冊事件
  socket.on('message', (msg) => {
    console.log(`伺服器收到來自[${socket.id}]的訊息：「${msg}」`);
  });
});
