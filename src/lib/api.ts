import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.API_URL || 'https://coordination-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  }
})