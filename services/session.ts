// services/session.ts
const KEY = import.meta.env.VITE_JWT_STORAGE_KEY || 'rancing_auth_token';

export function saveToken(token: string) {
  try { localStorage.setItem(KEY, token); } catch {}
}

export function getToken(): string | null {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

export function clearToken() {
  try { localStorage.removeItem(KEY); } catch {}
}
