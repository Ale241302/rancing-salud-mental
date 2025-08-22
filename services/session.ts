// services/session.ts
const KEY = import.meta.env.VITE_JWT_STORAGE_KEY || 'rancing_auth_token';

export function saveToken(token: string) {
  try { 
    localStorage.setItem(KEY, token);
    console.log('💾 Token guardado correctamente');
  } catch (error) {
    console.error('❌ Error guardando token:', error);
  }
}

export function getToken(): string | null {
  try { 
    const token = localStorage.getItem(KEY);
    console.log('🔍 Recuperando token:', token ? 'ENCONTRADO' : 'NO ENCONTRADO');
    return token; 
  } catch (error) {
    console.error('❌ Error recuperando token:', error);
    return null; 
  }
}

export function clearToken() {
  try { 
    localStorage.removeItem(KEY);
    console.log('🗑️ Token eliminado');
  } catch (error) {
    console.error('❌ Error eliminando token:', error);
  }
}
