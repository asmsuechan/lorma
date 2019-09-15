const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/conn_device');
socket.on('connect', () => {
  socket.emit('run_launch', {'socketId': '/conn_device#LEU185wCHR4WXQkjAAAA', 'uuid': 'abcdefg'});
  socket.close()
});

