import React from 'react';
import { TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSearch } from '@/hooks/useSearch';

interface DeviceSearchProps {
  onSearch: (search: string) => void;
}

export const DeviceSearch: React.FC<DeviceSearchProps> = ({ onSearch }) => {
  const { searchValue, handleSearchChange } = useSearch(onSearch, 500);

  return (
    <TextField
      fullWidth
      placeholder="Buscar dispositivos..."
      value={searchValue}
      onChange={(e) => handleSearchChange(e.target.value)}
      InputProps={{
        startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
      }}
      sx={{ mb: 3, maxWidth: 600 }}
    />
  );
};
