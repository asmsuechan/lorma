class Robot {
  constructor (uuid, socketId, geocode, launchCommands) {
    this.uuid = uuid
    this.socketId = socketId
    this.geocode = geocode
    this.launchCommands = launchCommands
  }
}

module.exports = Robot
