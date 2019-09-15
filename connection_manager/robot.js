class Robot {
  constructor (uuid, socketId, geohash, launchCommands) {
    this.uuid = uuid
    this.socketId = socketId
    this.geohash = geohash
    this.launchCommands = launchCommands
  }
}

module.exports = Robot
