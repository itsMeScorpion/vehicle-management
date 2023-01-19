import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7009/',
  timeout: 4000,
});
export default instance;
