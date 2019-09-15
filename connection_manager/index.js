const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const _ = require('lodash')
const Robot = require('./robot')

server.listen(3000);

let inmemoryDevices = []

app.get('/list_connections', (req, res) => {
  const filteredDevices = _.filter(inmemoryDevices, (device) => {
    return device.geohash === req.query.geohash
  })

  res.writeHead(200)
  res.write(JSON.stringify(filteredDevices))
  res.end()
});

io.of('/conn_device')
  .on('connection', function (socket) {
    socket.on('register_geohash', function (payload, msg) {
      if (!payload) return
      const parsedPayload = JSON.parse(payload)
      const robot = new Robot(parsedPayload['uuid'], socket.id, parsedPayload['geohash'], parsedPayload['launch_commands'])
      inmemoryDevices.push(robot)
      console.log('registered: ', inmemoryDevices);
    });

    socket.on('run_launch', function (payload, msg) {
      console.log(payload)
      socket.to(payload.socketId).emit('run_launch', { socketId: payload.socketId })
    })

    socket.on('disconnect', function () {
      const index = _.findIndex(inmemoryDevices, (device) => {
        return device.socketId === socket.id
      })
      delete inmemoryDevices[index]
    });
});
