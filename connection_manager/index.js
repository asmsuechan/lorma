const app = require('express')();
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const _ = require('lodash')

const Robot = require('./robot')
const Response = require('./response')

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

const createSuccessResponse = (data = null) => {
  return new Response('success', data, null)
}

const createErrorResponse = (error = null) => {
  return new Response('failed', null, error)
}

io.of('/conn_device')
  .on('connection', (socket) => {
    // From ROS
    socket.on('register_geocode', (payload, msg) => {
      if (!payload) {
        const msg = 'Payload must be included.'
        const errMsg = { msg }
        const response = createErrorResponse(errMsg)
        ack(response)
        return
      }

      const parsedPayload = JSON.parse(payload)
      const robot = new Robot(parsedPayload['uuid'], socket.id, parsedPayload['geocode'], parsedPayload['launch_commands'], parsedPayload['rosnodes'], parsedPayload['rosrun_commands'])
      inmemoryDatabase.push(robot)
      console.log('registered: ', inmemoryDatabase);
    });

    // From ROS
    socket.on('update_rosnodes', (payload, msg) => {
      if (!payload) return
      const parsedPayload = JSON.parse(payload)
      const robot = _.find(inmemoryDatabase, (r) => {
        return _.get(r, 'uuid') === _.get(parsedPayload, 'uuid')
      })
      console.log(parsedPayload)
      robot.rosnodes = _.get(parsedPayload, 'rosnodes') || []

      console.log('registered: ', inmemoryDatabase);
    });

    socket.on('register_device', (payload, ack = _.noop) => {
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

      const response = createSuccessResponse()
      ack(response)
    });

    socket.on('run_launch', (payload, ack = _.noop) => {
      const robots = _.filter(inmemoryDatabase, (robot) => {
        return _.get(robot, 'uuid') === payload['uuid']
      })

      _.forEach(robots, (robot) => {
        socket.to(robot.socketId).emit('run_launch', { socketId: robot.socketId, command: payload.command })
      })

      const response = createSuccessResponse()
      ack(response)
    })

    socket.on('run_rosrun', (payload, ack = _.noop) => {
      const robots = _.filter(inmemoryDatabase, (robot) => {
        return _.get(robot, 'uuid') === payload['uuid']
      })
      console.log(payload)

      _.forEach(robots, (robot) => {
        socket.to(robot.socketId).emit('run_rosrun', { socketId: robot.socketId, command: payload.command, args: payload.args })
      })

      const response = createSuccessResponse()
      ack(response)
    })

    socket.on('delegate', (payload, ack = _.noop) => {
      console.log(payload)
      const robots = _.filter(inmemoryDatabase, (robot) => {
        return _.get(robot, 'uuid') === payload['robotUuid']
      })

      _.forEach(robots, (robot) => {
        socket.to(robot.socketId).emit('rostopic', _.get(payload, 'msg'))
      })

      const response = createSuccessResponse()
      ack(response)
    })

    // From ROS
    socket.on('disconnect', () => {
      const index = _.findIndex(inmemoryDatabase, (robot) => {
        return _.get(robot, 'socketId') === socket.id
      })
      delete inmemoryDatabase[index]
      inmemoryDatabase = _.compact(inmemoryDatabase)
    });

    // From ROS
    socket.on('topic_from_ros', (payload, ack = _.noop) => {
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

      const response = createSuccessResponse()
      ack(response)
    });

    socket.on('kill_rosnodes', (payload, ack = _.noop) => {
      console.log(payload)
      const robot = _.find(inmemoryDatabase, (r) => {
        return _.get(r, 'uuid') === _.get(payload, 'uuid')
      })

      socket.to(robot.socketId).emit('kill_rosnodes', { socketId: robot.socketId, rosnodes: _.get(payload, 'rosnodes') })

      const response = createSuccessResponse()
      ack(response)
    })
});
