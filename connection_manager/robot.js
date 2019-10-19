class Robot {
  constructor (uuid, socketId, geocode, launchCommands, rosnodes, rosrunCommands) {
    this.uuid = uuid
    this.socketId = socketId
    this.geocode = geocode
    this.launchCommands = launchCommands
    this.rosnodes = rosnodes
    this.rosrunCommands = rosrunCommands
    this.devices = []
  }
}

module.exports = Robot
