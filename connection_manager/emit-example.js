const io = require('socket.io-client');
const socket = io.connect('http://ec2-54-199-179-50.ap-northeast-1.compute.amazonaws.com:3000/conn_device');
socket.on('connect', () => {
  socket.emit('run_launch', {'socketId': '/conn_device#AB1zdKB6AAtKvcANAAAA', 'uuid': 'abcdefg'});
  socket.close()
});

