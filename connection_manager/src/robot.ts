export default class Robot {
  uuid: string;
  socketId: string;
  launchCommands: Array<string>;
  rosnodes: Array<string>;
  rosrunCommands: Array<string>;
  devices: Array<object>;

  constructor (uuid: string, socketId: string, launchCommands: Array<string>, rosnodes: Array<string>, rosrunCommands: Array<string>) {
    this.uuid = uuid
    this.socketId = socketId
    this.launchCommands = launchCommands
    this.rosnodes = rosnodes
    this.rosrunCommands = rosrunCommands
    this.devices = []
  }
}
