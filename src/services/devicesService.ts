import { apiClient } from './api';
import type { DevicesResponse } from '@/types/device.types';
import { MOCK_DEVICES } from '@/data/devices';

const USE_MOCK = false; // Change to false when api is working

export const fetchDevicesService = async (
  limit: number = 5,
  offset: number = 0,
  search: string = ''
): Promise<DevicesResponse> => {
  
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 600));

    let filtered = MOCK_DEVICES;

    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = MOCK_DEVICES.filter(device =>
        device.device_name.toLowerCase().includes(lowerSearch) ||
        device.device_model.toLowerCase().includes(lowerSearch) ||
        device.factory_family.toLowerCase().includes(lowerSearch)
      );
    }

    const paginated = filtered.slice(offset, offset + limit);

    return {
      message: 'Mocked device list',
      status: 200,
      data: {
        results: paginated,
        total: filtered.length,
        offset,
        limit,
      },
    };
  }

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
