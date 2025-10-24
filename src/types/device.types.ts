export interface Device {
  device_model: string;
  device_name: string;
  entity_group: any;
  factory_family: string;
  hasGroups: boolean;
  id_device: number;
  id_device_model: number;
  photo: string;
  settings_device: SettingDevice;
  status: number;
}

export interface SettingDevice {
  access_type: number;
  disabled: number;
  exit_btn_pos: number;
  id_device_action_type: number;
  id_structure: number;
  id_timezone: number;
  online: number;
  serial: string;
  time_open_door: number;
}

export interface DevicesResponse {
 message: string;
 status: number;
 data: DevicesResponseData;
}

export interface DevicesResponseData {
  results: Device[];
  total?: number;
  offset?: number;
  limit?: number;
}

export interface DevicesState {
  list: Device[];
  loading: boolean;
  error: string | null;
  offset: number;
  hasMore: boolean;
}

export interface FetchDevicesParams {
  limit?: number;
  offset?: number;
  search?: string;
}
