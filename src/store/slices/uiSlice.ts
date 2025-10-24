import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  currentTab: number;
  sidebarOpen: boolean;
}

const initialState: UIState = {
  currentTab: 0,
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<number>) => {
      state.currentTab = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { setCurrentTab, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
