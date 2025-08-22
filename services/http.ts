import axios from 'axios';
import { getToken } from './auth';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  withCredentials: true,        // no estorba, aunque uses Bearer
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: { 'Content-Type': 'application/json' }
});

// añade Authorization: Bearer <token> si existe
http.interceptors.request.use(cfg => {
  const t = getToken();
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

// log de errores
http.interceptors.response.use(
  r => r,
  e => {
    console.error('API error:', e?.response?.status, e?.response?.data);
    return Promise.reject(e);
  }
);
