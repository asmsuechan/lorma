import axios from 'axios';
import io from 'socket.io-client';

import getGeohash from './geolocation';

class Rowma {
  constructor(geohash, opts = {}) {
    this.geohash = geohash;

    this.baseURL = opts.baseURL || '18.176.1.219';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 1000
    });
  }

  currentConnectionList() {
    const path = '/list_connections';
    const params = { geohash: this.geohash };
    return this.client.get(path, { params });
  }

  runLaunch(uuid, command) {
    const socket = io.connect(`${this.baseURL}/conn_device`);
    socket.on('connect', () => {
      console.log('payloads: ', { uuid, command })
      socket.emit('run_launch', { uuid, command });
      // TODO: Get response from server to wait some event
      socket.close();
    });
  }
}

export default Rowma;
