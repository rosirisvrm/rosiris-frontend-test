import { useState, useEffect, useCallback } from 'react';

interface UseSearchReturn {
  searchValue: string;
  debouncedValue: string;
  handleSearchChange: (value: string) => void;
}

export const useSearch = (
  onSearch?: (value: string) => void,
  delay: number = 500
): UseSearchReturn => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchValue, delay]);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  return {
    searchValue,
    debouncedValue,
    handleSearchChange,
  };
};
