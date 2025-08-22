// services/auth.ts
import { http } from './http';

const KEY = import.meta.env.VITE_JWT_STORAGE_KEY || 'rancing_auth_token';

export const getToken   = () => localStorage.getItem(KEY);
export const setToken   = (t: string) => localStorage.setItem(KEY, t);
export const clearToken = () => localStorage.removeItem(KEY);

export async function register(data: RegisterPayload) {
  const res = await http.post('/auth/register', data);
  if (res.data.success && res.data.data?.token) setToken(res.data.data.token);
  return res.data;
}

export async function login(data: LoginPayload) {
  const res = await http.post('/auth/login', data);
  if (res.data.success && res.data.data?.token) setToken(res.data.data.token);
  return res.data;
}

export async function profile() {
  return (await http.get('/auth/profile')).data;
}

export async function logoutApi() {
  clearToken();
  return (await http.post('/auth/logout')).data;
}
