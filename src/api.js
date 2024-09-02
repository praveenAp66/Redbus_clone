// src/api.js
import axios from 'axios';



// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/redbus', // Default to localhost if not set
});

export default api;
