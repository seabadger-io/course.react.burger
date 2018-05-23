import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-aa93c.firebaseio.com/'
});

export default instance;