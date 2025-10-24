import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchCharacters } from '@/services/characterService';
import type { Character, CharactersResponse } from '@/types/character.types';

interface CharactersState {
  list: Character[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

export const loadCharacters = createAsyncThunk<
  CharactersResponse,
  number,
  { rejectValue: string }
>(
  'characters/load',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchCharacters(page);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Error desconocido');
    }
  }
);

const initialState: CharactersState = {
  list: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  hasMore: true,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    clearCharacters: (state) => {
      state.list = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCharacters.fulfilled, (state, action: PayloadAction<CharactersResponse>) => {
        state.loading = false;
        state.list = action.payload.results;
        state.totalPages = action.payload.info.pages;
        state.hasMore = action.payload.info.next !== null;
      })
      .addCase(loadCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al cargar personajes';
      });
  },
});

export const { clearCharacters, setCurrentPage } = charactersSlice.actions;
export default charactersSlice.reducer;
