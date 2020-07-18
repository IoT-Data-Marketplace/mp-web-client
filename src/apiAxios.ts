import axios from 'axios';

export default axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://iot-data-mp.com' : 'http://localhost:8050',
});
