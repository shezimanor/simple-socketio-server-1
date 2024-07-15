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
  socket.on('join-gold', () => {
    // 加入房間 `gold`
    socket.join('gold');
    console.log(io.sockets.adapter.rooms);
    console.log('Room gold: ', io.sockets.adapter.rooms['gold']);
  });

  // 註冊事件
  socket.on('join-silver', () => {
    // 加入房間 `silver`
    socket.join('silver');
    console.log(io.sockets.adapter.rooms);
    console.log('Room silver: ', io.sockets.adapter.rooms['silver']);
  });

  // 註冊事件
  socket.on('join-bronze', () => {
    // 加入房間 `bronze`
    socket.join('bronze');
    console.log(io.sockets.adapter.rooms);
    console.log('Room bronze: ', io.sockets.adapter.rooms['bronze']);
  });
});
