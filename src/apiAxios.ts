import axios from 'axios';
import { baseEndpoint } from './constants';

export default axios.create({
  baseURL: baseEndpoint,
});
