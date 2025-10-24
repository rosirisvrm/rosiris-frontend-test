import { apiClient } from './api';
import type { LoginResponse } from '@/types/auth.types';

const USE_MOCK = true; // Change to false when the API in working

export const loginService = async (email: string, password: string): Promise<LoginResponse> => {
  // Mock data
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === 'carlospea13+1@gmail.com' && password === '123456') {
      return {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdF9jcmVhdGVkIjoiMjAyNS0xMC0yM1QwMTo1MzozNy42MDhaIn0.imf9k4HMWaDlRrCggSmWT7THEnmeCmRy5Qz82VXvb3E',
        user: {
          id: '1',
          email: 'carlospea13+1@gmail.com',
          name: 'Carlos Peña',
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
