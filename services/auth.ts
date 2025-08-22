// services/auth.ts
import { http } from './http';
import { saveToken, clearToken } from './session';

export type RegisterPayload = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};
export type LoginPayload = { email: string; password: string };

export interface UserDTO {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    user: UserDTO;
    token: string;
    expires_in: number;
    token_type?: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
}

export async function register(data: RegisterPayload) {
  const res = await http.post('/auth/register', data);
  const body: AuthResponse = res.data;
  if (body?.success && body?.data?.token) {
    saveToken(body.data.token);
  }
  return body;
}

export async function login(data: LoginPayload) {
  const res = await http.post('/auth/login', data);
  const body: AuthResponse = res.data;
  if (body?.success && body?.data?.token) {
    saveToken(body.data.token);
  }
  return body;
}

export async function profile() {
  const res = await http.get('/auth/profile');
  return res.data; // { success, data: { user } }
}
export async function logout() {
  try {
    await http.post('/auth/logout');
  } catch (error) {
    console.error('Logout API error:', error);
  } finally {
    clearToken();
  }
}
