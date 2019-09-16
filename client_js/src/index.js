import axios from 'axios';
import io from 'socket.io-client';

import getGeohash from './geolocation';
import Lorma from './lorma';

export default Lorma;
export { getGeohash }
