// services/auth.ts
import { http } from './http';

export type RegisterPayload = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};
export type LoginPayload = { email: string; password: string };

export async function register(data: RegisterPayload) {
  const res = await http.post('/auth/register', data);
  return res.data; // { success, data: { user, token?... } }
}

export async function login(data: LoginPayload) {
  const res = await http.post('/auth/login', data);
  return res.data; // { success, data: { user, token } } (si manejas Bearer)
}

export async function profile() {
  const res = await http.get('/auth/profile');
  return res.data; // requiere Authorization o cookie, según tu backend
}

export async function logout() {
  const res = await http.post('/auth/logout', {}); // si lo implementas
  return res.data;
}
