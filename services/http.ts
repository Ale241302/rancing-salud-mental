// services/http.ts
import axios from 'axios';
import { getToken } from './session';

const timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🔐 Header Authorization añadido');
  } else {
    console.log('⚠️ No hay token para añadir a headers');
  }
  return config;
});

http.interceptors.response.use(
  (r) => r,
  (e) => {
    console.error('API error:', e?.response?.status, e?.response?.data);
    return Promise.reject(e);
  }
);
