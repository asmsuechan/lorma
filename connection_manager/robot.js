class Robot {
  constructor (uuid, socketId, launchCommands, rosnodes, rosrunCommands) {
    this.uuid = uuid
    this.socketId = socketId
    this.launchCommands = launchCommands
    this.rosnodes = rosnodes
    this.rosrunCommands = rosrunCommands
    this.devices = []
  }
}

module.exports = Robot
