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
  const filteredDevices = _.filter(inmemoryDatabase, (robot) => {
    return _.get(robot, 'geocode') === _.get(req, 'query.geocode')
  })

  res.writeHead(200)
  res.write(JSON.stringify(filteredDevices))
  res.end()
});

app.get('/robots', (req, res) => {
  const robot = _.find(inmemoryDatabase, (r) => {
    return _.get(r, 'uuid') === _.get(req, 'query.uuid')
  })

  res.writeHead(200)
  res.write(JSON.stringify(robot || {}))
  res.end()
});

io.of('/conn_device')
  .on('connection', function (socket) {
    // From ROS
    socket.on('register_geocode', function (payload, msg) {
      if (!payload) return
      const parsedPayload = JSON.parse(payload)
      const robot = new Robot(parsedPayload['uuid'], socket.id, parsedPayload['geocode'], parsedPayload['launch_commands'], parsedPayload['rosnodes'])
      inmemoryDatabase.push(robot)
      console.log('registered: ', inmemoryDatabase);
    });

    // From ROS
    socket.on('update_rosnodes', function (payload, msg) {
      if (!payload) return
      const parsedPayload = JSON.parse(payload)
      const robot = _.find(inmemoryDatabase, (r) => {
        return _.get(r, 'uuid') === _.get(parsedPayload, 'uuid')
      })
      console.log(parsedPayload)
      robot.rosnodes = _.get(parsedPayload, 'rosnodes') || []

      console.log('registered: ', inmemoryDatabase);
    });

    socket.on('register_device', function (payload, msg) {
      if (!payload) return
      const robot = _.find(inmemoryDatabase, (r) => {
        return _.get(r, 'uuid') === payload['robotUuid']
      })

      if (!robot) return // TODO some handling
      robot.devices.push({uuid: payload['deviceUuid'], socketId: socket.id})

      const index = _.findIndex(inmemoryDatabase, (r) => {
        return _.get(r, 'uuid') === robot.id
      })
      inmemoryDatabase = _.compact(inmemoryDatabase)
      console.log(inmemoryDatabase)
    });

    socket.on('run_launch', function (payload, msg) {
      const robots = _.filter(inmemoryDatabase, (robot) => {
        return _.get(robot, 'uuid') === payload['uuid']
      })

      _.forEach(robots, (robot) => {
        socket.to(robot.socketId).emit('run_launch', { socketId: robot.socketId, command: payload.command })
      })
    })

    socket.on('delegate', function (payload, msg) {
      console.log(payload)
      const robots = _.filter(inmemoryDatabase, (robot) => {
        return _.get(robot, 'uuid') === payload['robotUuid']
      })

      _.forEach(robots, (robot) => {
        socket.to(robot.socketId).emit('rostopic', _.get(payload, 'msg'))
      })
    })

    // From ROS
    socket.on('disconnect', function () {
      const index = _.findIndex(inmemoryDatabase, (robot) => {
        return _.get(robot, 'socketId') === socket.id
      })
      delete inmemoryDatabase[index]
      inmemoryDatabase = _.compact(inmemoryDatabase)
    });

    // From ROS
    socket.on('topic_from_ros', function (payload, msg) {
      const parsedPayload = JSON.parse(payload)
      const robot = _.find(inmemoryDatabase, (r) => {
        return _.get(r, 'uuid') === _.get(parsedPayload, 'robotUuid')
      })
      _.each(robot.devices, (device) => {
        _.each(_.get(parsedPayload, 'deviceUuids'), (payloadDeviceUuid) => {
          if (device.uuid == payloadDeviceUuid) {
            socket.to(device.socketId).emit('topic_to_device', payload)
          }
        })
      })
    });

    socket.on('kill_rosnodes', function (payload, msg) {
      //const parsedPayload = JSON.parse(payload)
      console.log(payload)
      const robot = _.find(inmemoryDatabase, (r) => {
        return _.get(r, 'uuid') === _.get(payload, 'uuid')
      })

      socket.to(robot.socketId).emit('kill_rosnodes', { socketId: robot.socketId, rosnodes: _.get(payload, 'rosnodes') })
    })
});
