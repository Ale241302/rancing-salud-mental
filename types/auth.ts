export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    user: User;
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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
