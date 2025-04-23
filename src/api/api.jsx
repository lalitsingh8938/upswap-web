import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.upswap.app/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
