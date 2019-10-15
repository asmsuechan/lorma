import axios from 'axios';
import io from 'socket.io-client';

class Rowma {
  constructor(geocode, opts = {}) {
    this.geocode = geocode;

    this.baseURL = opts.baseURL || 'http://18.176.1.219';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 1000
    });
  }

  currentConnectionList() {
    const path = '/list_connections';
    const params = { geocode: this.geocode };
    return this.client.get(path, { params });
  }

  runLaunch(socket, uuid, command) {
    console.log('payloads: ', { uuid, command });
    socket.emit('run_launch', { uuid, command });
  }

  connect() {
    return new Promise((resolve, reject) => {
      try {
        const socket = io.connect(`${this.baseURL}/conn_device`)
        resolve(socket)
      } catch (e) {
        reject(e)
      }
    })
  }

  close(socket) {
    socket.close()
  }

  publishTopic(socket, uuid, msg) {
    socket.emit('delegate', { uuid, msg });
  }
}

export default Rowma;
