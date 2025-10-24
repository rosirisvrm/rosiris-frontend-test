import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices, resetDevices } from '../store/slices/devicesSlice';
import type { RootState, AppDispatch } from '@/store';
import type { Device } from '@/types/device.types';

interface UseDevicesReturn {
  devices: Device[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadDevices: (search?: string, reset?: boolean) => void;
  loadMore: () => void;
  resetList: () => void;
}

export const useDevices = (): UseDevicesReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error, offset, hasMore } = useSelector((state: RootState) => state.devices);
  // const { token } = useSelector((state: RootState) => state.auth);

  const loadDevices = (search: string = '', reset: boolean = false) => {
    // if (!token) return;
    
    const currentOffset = reset ? 0 : offset;

    dispatch(fetchDevices({ 
      limit: 5, 
      offset: currentOffset, 
      search,
      reset
    }));
  };

  const loadMore = () => {
    // if (!token || !hasMore || loading) return;
    if (!hasMore || loading) return;
    
    dispatch(fetchDevices({ 
      limit: 5, 
      offset, 
      search: '',
      reset: false
    }));
  };

  const resetList = () => {
    dispatch(resetDevices());
  };

  return {
    devices: list,
    loading,
    error,
    hasMore,
    loadDevices,
    loadMore,
    resetList,
  };
};
