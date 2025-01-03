import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Update this to match your backend's address
});

export default instance;



