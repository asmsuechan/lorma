class Robot {
  constructor (uuid, socketId, geocode, launchCommands, rosnodes) {
    this.uuid = uuid
    this.socketId = socketId
    this.geocode = geocode
    this.launchCommands = launchCommands
    this.rosnodes = rosnodes
    this.devices = []
  }
}

module.exports = Robot
