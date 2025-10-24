import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDevicesService } from '@/services/devicesService';
import type { DevicesState, FetchDevicesParams, DevicesResponseData } from '@/types/device.types';

export const fetchDevices = createAsyncThunk<
  DevicesResponseData & { reset?: boolean },
  FetchDevicesParams & { reset?: boolean },
  { rejectValue: string }
>(
  'devices/fetch',
  async ({ limit = 6, offset = 0, search = '', reset = false }, { rejectWithValue }) => {
    try {
      const response = await fetchDevicesService(limit, offset, search);
      const results = response.data;
      return { ...results, reset };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Error desconocido');
    }
  }
);

const initialState: DevicesState = {
  list: [],
  loading: false,
  error: null,
  offset: 0,
  hasMore: true,
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    resetDevices: (state) => {
      state.list = [];
      state.offset = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false;
        const { results, reset } = action.payload;
        
        // Si es reset (búsqueda nueva), reemplazar lista
        if (reset) {
          state.list = results;
          state.offset = results.length;
        } else {
          // Si es "cargar más", agregar a la lista existente
          state.list = [...state.list, ...results];
          state.offset = state.offset + results.length;
        }
        
        // Verificar si hay más datos
        state.hasMore = results.length >= 5;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al cargar dispositivos';
      });
  },
});

export const { resetDevices } = devicesSlice.actions;
export default devicesSlice.reducer;
