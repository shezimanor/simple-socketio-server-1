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
  // 觸發事件: boardcast event 1
  // It broadcast the event to every other connected clients except for the one who emitted the event. (觸發事件的 client 不會收到這個事件)
  socket.broadcast.emit(
    'message',
    'Attention please! This is a broadcast! A new user join us now!'
  );
  // 觸發事件: boardcast event 2
  // It broadcast the event to every other connected clients, including the one who emitted the event. (觸發事件的 client 也會收到這個事件)
  io.emit(
    'message',
    'Attention please! This is a broadcast! A new user join us now! And them will see this message!'
  );

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

  // 註冊事件: send-user-info
  socket.on('send-user-info', (userInfo, callback) => {
    console.log(`伺服器收到來自[${socket.id}]的 "send-user-info"：${userInfo}`);
    // 加入新的 user
    users[`${socket.id}`] = userInfo;
    console.log('Now users: ', users);
    // callback: 讓 client side 確認 server side 已經收到並回應了，發送確認訊息給 client
    callback('Server has responded! [send-user-info]');
  });

  // 註冊事件: timeout-event
  socket.on('timeout-event', (callback) => {
    console.log('The timeout event');
    // 把下面這行註解掉，timeout 後就會顯示錯誤
    callback('Server has responded! [timeout-event]');
    // （或是用 setTimeout 超過 timeout 後再回傳也可以造成錯誤）
    // setTimeout(() => {
    //   callback('Server has responded! [timeout-event]');
    // }, 5000);
  });

  // 註冊事件: cancel-all-events
  socket.on('cancel-all-events', () => {
    socket.removeAllListeners();
  });
});
