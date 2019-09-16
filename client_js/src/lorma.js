import axios from 'axios';
import io from 'socket.io-client';

import getGeohash from './geolocation';

class Lorma {
  constructor(geohash, opts = {}) {
    this.geohash = geohash;

    this.baseURL = opts.baseURL || 'http://ec2-54-199-179-50.ap-northeast-1.compute.amazonaws.com';
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

  runLaunch(uuid) {
    console.log(this.baseURL)
    const socket = io.connect(`${this.baseURL}/conn_device`);
    socket.on('connect', () => {
      socket.emit('run_launch', { uuid });
      // TODO: Get response from server to wait some event
      socket.close();
    });
  }
}

export default Lorma;
