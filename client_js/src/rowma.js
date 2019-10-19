import axios from 'axios';
import io from 'socket.io-client';
import uuidv4 from 'uuid/v4';

class Rowma {
  constructor(geocode, opts = {}) {
    this.geocode = geocode;

    this.baseURL = opts.baseURL || 'http://18.176.1.219';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 1000
    });
    this.uuid = uuidv4();
  }

  currentConnectionList() {
    const path = '/list_connections';
    const params = { geocode: this.geocode };
    return this.client.get(path, { params });
  }

  getRobotStatus(uuid) {
    const path = '/robots';
    const params = { uuid };
    return this.client.get(path, { params });
  }

  runLaunch(socket, uuid, command) {
    console.log('payloads: ', { uuid, command });
    socket.emit('run_launch', { uuid, command });
  }

  runRosrun(socket, uuid, command, args) {
    console.log('payloads: ', { uuid, command, args });
    socket.emit('run_rosrun', { uuid, command, args});
  }

  killNodes(socket, uuid, rosnodes) {
    socket.emit('kill_rosnodes', { uuid, rosnodes });
  }

  registerDevice(socket, robotUuid) {
    socket.emit('register_device', { deviceUuid: this.uuid, robotUuid  });
  }

  connect(robotUuid) {
    return new Promise((resolve, reject) => {
      try {
        const socket = io.connect(`${this.baseURL}/conn_device`);
        this.registerDevice(socket, robotUuid)

        socket.on('topic_to_device', function (event, args) {
          console.log("event: ", event, args);
        });
        resolve(socket);
      } catch (e) {
        reject(e);
      }
    });
  }

  close(socket) {
    socket.close();
  }

  publishTopic(socket, robotUuid, msg) {
    socket.emit('delegate', { robotUuid, msg });
  }

  subscribeTopic(socket, robotUuid, topic) {
    // TODO: Make msg JSON string
    const msg =  {
      "op": "subscribe",
      "deviceUuid": this.uuid,
      "topic": topic
    }

    socket.emit('delegate', { robotUuid, msg });
  }
}

export default Rowma;
