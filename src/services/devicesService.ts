import { apiClient } from './api';
import type { DevicesResponse, Device } from '@/types/device.types';

const USE_MOCK = true; // Change to false when api is working

// Mock data 
const MOCK_DEVICES: Device[] = [
  {
    id_device: 1,
    id_device_model: 101,
    device_name: 'iPhone 15 Pro',
    device_model: 'A3100',
    factory_family: 'Apple',
    entity_group: null,
    hasGroups: false,
    photo: 'https://tse3.mm.bing.net/th/id/OIP.47hlW2Nbq3iVwQlk8oCktAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    status: 0,
    settings_device: {
      access_type: 1,
      disabled: 0,
      exit_btn_pos: 2,
      id_device_action_type: 3,
      id_structure: 10,
      id_timezone: 4,
      online: 1,
      serial: 'IP15P-0001',
      time_open_door: 5,
    },
  },
  {
    id_device: 2,
    id_device_model: 102,
    device_name: 'Galaxy S24',
    device_model: 'SM-S921B',
    factory_family: 'Samsung',
    entity_group: null,
    hasGroups: true,
    photo: 'https://tse1.mm.bing.net/th/id/OIP.FpxLz2z3K0uTLDDu0ZNBMgHaHc?rs=1&pid=ImgDetMain&o=7&rm=3',
    status: 0,
    settings_device: {
      access_type: 2,
      disabled: 0,
      exit_btn_pos: 1,
      id_device_action_type: 2,
      id_structure: 12,
      id_timezone: 3,
      online: 1,
      serial: 'GS24-0002',
      time_open_door: 4,
    },
  }
];

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
