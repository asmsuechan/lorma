import axios from 'axios';

const getGeohash = async () => {
  const options = {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json'
    }
  };
  const result = await axios.get('https://freegeoip.app/json', options)
    .then(res => res.data);
  return result;
};

export default getGeohash;
