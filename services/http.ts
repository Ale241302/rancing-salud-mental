// services/http.ts
import axios from 'axios';

const timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  withCredentials: true, // deja true si planeas cookies HttpOnly
  timeout,
  headers: { 'Content-Type': 'application/json' }
});

http.interceptors.response.use(
  (r) => r,
  (e) => {
    console.error('API error:', e?.response?.status, e?.response?.data);
    return Promise.reject(e);
  }
);
