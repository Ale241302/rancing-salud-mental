// test-api.mjs
import axios from 'axios';

const BASE_URL = 'http://localhost/api-rancing-salud-mental/api'; // ← AGREGAR /api

async function testAPI() {
  try {
    console.log('🧪 Probando conexión con API backend...\n');

    // Prueba básica primero
    console.log('🔧 Probando endpoint básico...');
    const testResponse = await axios.get(`${BASE_URL}/test`);
    console.log('✅ Test exitoso:', testResponse.data);
    console.log('');

    // Prueba de registro
    console.log('📝 Registrando usuario de prueba...');
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
      email: 'test@example.com',
      password: 'test123',
      first_name: 'Test',
      last_name: 'User'
    });
    console.log('✅ Registro exitoso:', registerResponse.data);
    console.log('');

    // Prueba de login
    console.log('🔐 Iniciando sesión...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'test123'
    });
    console.log('✅ Login exitoso:', loginResponse.data);
    console.log('');

    // Prueba de perfil con token
    const token = loginResponse.data.data.token;
    console.log('👤 Obteniendo perfil...');
    const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Perfil obtenido:', profileResponse.data);

  } catch (error) {
    console.error('❌ Error en API:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
  }
}

testAPI();
