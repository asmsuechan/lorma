const app = require('express')();
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const _ = require('lodash')

import Robot from './robot'
import Device from './device'
import WSResponse from './response'

import inmemoryDb from './db/inmemory-database'

let robotInmemoryDatabase: Array<Robot> = []
let deviceInmemoryDatabase: Array<Device> = []

const db = new inmemoryDb(robotInmemoryDatabase, deviceInmemoryDatabase)

server.listen(80);
app.use(cors())

app.get('/list_connections', (req, res) => {
  res.writeHead(200)
  res.write(JSON.stringify(db.getAllRobots()))
  res.end()
});

app.get('/robots', (req, res) => {
  const robotUuid = _.get(req, 'query.uuid')
  const robot = db.findRobotByUuid(robotUuid)

  res.writeHead(200)
  res.write(JSON.stringify(robot || {}))
  res.end()
});

const createSuccessResponse = (data: string = '') => {
  return new WSResponse('success', data, '')
}

const createErrorResponse = (error: string = '') => {
  return new WSResponse('failed', '', error)
}

io.of('/conn_device')
  .on('connection', (socket) => {
    // From ROS
    socket.on('register_robot', (payload, ack) => {
      if (!payload) {
        const msg = 'Payload must be included.'
        const response = createErrorResponse(msg)
        if (ack) ack(response)
        return
      }

      const parsedPayload = JSON.parse(payload)
      const robot = new Robot(parsedPayload['uuid'], socket.id, parsedPayload['launch_commands'], parsedPayload['rosnodes'], parsedPayload['rosrun_commands'])
      db.saveRobot(robot)
      console.log('registered: ', db.getAllRobots());
    });

    // From ROS
    socket.on('update_rosnodes', (payload, msg) => {
      if (!payload) return
      const parsedPayload = JSON.parse(payload)
      const robotUuid = _.get(parsedPayload, 'uuid')
      const robot = db.findRobotByUuid(robotUuid)
      console.log(parsedPayload)
      const rosnodes = _.get(parsedPayload, 'rosnodes') || []
      db.updateRobotRosnodes(robotUuid, rosnodes)

      console.log('registered: ', db.getAllRobots());
    });

    socket.on('register_device', (payload, ack = _.noop) => {
      if (!payload) return
      const robotUuid = _.get(payload, 'robotUuid')
      const robot = db.findRobotByUuid(robotUuid)

      if (!robot) return // TODO some handling
      const device = new Device(payload['deviceUuid'], socket.id, robot.uuid)
      db.saveDevice(device)
      db.compactDeviceDb()

      console.log(db.getAllDevices())

      const response = createSuccessResponse()
      ack(response)
    });

    socket.on('run_launch', (payload, ack = _.noop) => {
      const robotUuid = _.get(payload, 'uuid')
      const robot = db.findRobotByUuid(robotUuid)

      socket.to(robot.socketId).emit('run_launch', { socketId: robot.socketId, command: payload.command })

      const response = createSuccessResponse()
      ack(response)
    })

    socket.on('run_rosrun', (payload, ack = _.noop) => {
      const robotUuid = _.get(payload, 'uuid')
      const robot = db.findRobotByUuid(robotUuid)
      console.log(payload)

      socket.to(robot.socketId).emit('run_rosrun', { socketId: robot.socketId, command: payload.command, args: payload.args })

      const response = createSuccessResponse()
      ack(response)
    })

    socket.on('delegate', (payload, ack = _.noop) => {
      console.log(payload)
      const robotUuid = _.get(payload, 'robotUuid')
      const robot = db.findRobotByUuid(robotUuid)

      socket.to(robot.socketId).emit('rostopic', _.get(payload, 'msg'))

      const response = createSuccessResponse()
      ack(response)
    })

    // From ROS
    socket.on('disconnect', () => {
      db.removeRobot(socket.id)
    });

    // From ROS
    socket.on('topic_from_ros', (payload, ack = _.noop) => {
      const parsedPayload = JSON.parse(payload)
      const robotUuid = _.get(parsedPayload, 'robotUuid')
      const devices = db.getAllDevicesByRobotUuid(robotUuid)
      _.each(devices, (device) => {
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
      const robotUuid = _.get(payload, 'uuid')
      const robot = db.findRobotByUuid(robotUuid)

      socket.to(robot.socketId).emit('kill_rosnodes', { socketId: robot.socketId, rosnodes: _.get(payload, 'rosnodes') })

      const response = createSuccessResponse()
      ack(response)
    })
});

// Note: https://blog.fullstacktraining.com/cannot-redeclare-block-scoped-variable-name/
export {}
