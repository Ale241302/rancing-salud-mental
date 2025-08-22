// services/session.ts
const KEY = import.meta.env.VITE_JWT_STORAGE_KEY || 'rancing_auth_token';

export function saveToken(token: string) {
  try { 
    localStorage.setItem(KEY, token); 
  } catch (error) {
    console.error('Error saving token:', error);
  }
}

export function getToken(): string | null {
  try { 
    return localStorage.getItem(KEY); 
  } catch (error) {
    console.error('Error getting token:', error);
    return null; 
  }
}

export function clearToken() {
  try { 
    localStorage.removeItem(KEY); 
  } catch (error) {
    console.error('Error clearing token:', error);
  }
}
