import { apiClient } from './api';
import type { LoginResponse } from '@/types/auth.types';

const USE_MOCK = true; // Change to false when the API in working

export const loginService = async (email: string, password: string): Promise<LoginResponse> => {
  // Mock data
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === 'admin@email.com' && password === '123456') {
      return {
        token: '1234567890',
        user: {
          id: '1',
          email: 'admin@email.com',
          name: 'Admin',
          modules: [
            { name: 'Dispositivos', route: '/devices' },
            { name: 'Personajes', route: '/characters' },
          ],
        },
        modules: [
          { name: 'Dispositivos', route: '/devices' },
          { name: 'Personajes', route: '/characters' },
        ],
      };
    } else {
      throw new Error('Credenciales incorrectas');
    }
  }

  // Real Api
  try {
    const response = await apiClient.post<LoginResponse>('/login', {
      email,
      password,
    });
    return response as unknown as LoginResponse;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};
