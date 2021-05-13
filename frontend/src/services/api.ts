import axios from 'axios';

const api = axios.create({
  baseURL: 'https://brxmd2u13h.execute-api.us-east-2.amazonaws.com/prod',
});

export default api;