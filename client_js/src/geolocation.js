import axios from 'axios';
import geohash from 'ngeohash';

const getGeohash = async () => {
  const options = {
    method: 'GET',
    hostname: 'freegeoip.app',
    port: null,
    path: '/json/',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json'
    }
  };
  const result = await axios.get('https://freegeoip.app/json/', options)
    .then(res => res.data);
  console.log(geohash.encode(result.latitude, result.longitude))
  const precision = 6; // cut geohash to 6 characters
  return geohash.encode(result.latitude, result.longitude).slice(0, precision);
};

export default getGeohash;
