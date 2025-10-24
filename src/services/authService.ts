import { apiClient } from './api';
import type { LoginResponse } from '@/types/auth.types';

export const loginService = async (email: string, password: string): Promise<LoginResponse> => {
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