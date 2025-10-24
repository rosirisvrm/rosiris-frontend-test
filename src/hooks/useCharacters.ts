import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCharacters, setCurrentPage } from '@/store/slices/charactersSlice';
import type { RootState, AppDispatch } from '@/store';
import type { Character } from '@/types/character.types';

interface UseCharactersReturn {
  characters: Character[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  loadPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useCharacters = (): UseCharactersReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error, currentPage, totalPages, hasMore } = useSelector(
    (state: RootState) => state.characters
  );

  useEffect(() => {
    if (list.length === 0) {
      dispatch(loadCharacters(1));
    }
  }, [dispatch, list.length]);

  const loadPage = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(loadCharacters(page));
  };

  const nextPage = () => {
    if (hasMore && currentPage < totalPages) {
      loadPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      loadPage(currentPage - 1);
    }
  };

  return {
    characters: list,
    loading,
    error,
    currentPage,
    totalPages,
    hasMore,
    loadPage,
    nextPage,
    prevPage,
  };
};
