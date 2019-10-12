const app = require('express')();
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const _ = require('lodash')
const Robot = require('./robot')

server.listen(80);

let inmemoryDatabase = []

app.use(cors())

app.get('/list_connections', (req, res) => {
  const filteredDevices = _.filter(inmemoryDatabase, (device) => {
    return _.get(device, 'geocode') === _.get(req, 'query.geocode')
  })

  res.writeHead(200)
  res.write(JSON.stringify(filteredDevices))
  res.end()
});

io.of('/conn_device')
  .on('connection', function (socket) {
    socket.on('register_geocode', function (payload, msg) {
      if (!payload) return
      const parsedPayload = JSON.parse(payload)
      const robot = new Robot(parsedPayload['uuid'], socket.id, parsedPayload['geocode'], parsedPayload['launch_commands'])
      inmemoryDatabase.push(robot)
      console.log('registered: ', inmemoryDatabase);
    });

    socket.on('run_launch', function (payload, msg) {
      const devices = _.filter(inmemoryDatabase, (device) => {
        return _.get(device, 'uuid') === payload['uuid']
      })

      _.forEach(devices, (device) => {
        socket.to(device.socketId).emit('run_launch', { socketId: device.socketId, command: payload.command })
      })
    })

    socket.on('disconnect', function () {
      const index = _.findIndex(inmemoryDatabase, (device) => {
        return _.get(device, 'socketId') === socket.id
      })
      delete inmemoryDatabase[index]
    });
});
