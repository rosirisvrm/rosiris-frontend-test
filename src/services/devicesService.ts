import { apiClient } from './api';
import type { DevicesResponse } from '@/types/device.types';

export const fetchDevicesService = async (
  limit: number = 5,
  offset: number = 0,
  search: string = ''
): Promise<DevicesResponse> => {
  try {
    const params: Record<string, any> = {
      limit,
      offset,
      search,
    };
    
    // if (search) {
    //   params.search = search;
    // }

    const response = await apiClient.get<DevicesResponse>('/devices', { params });
    return response as unknown as DevicesResponse;
  } catch (error) {
    throw new Error('Error al cargar dispositivos');
  }
};
