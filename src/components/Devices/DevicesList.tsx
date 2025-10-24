import React, { useEffect } from 'react';
import { 
  Box, 
  Grid, 
  CircularProgress, 
  Button, 
  Typography, 
  Alert 
} from '@mui/material';
import { DeviceCard } from './DeviceCard';
import { DeviceSearch } from './DevicesSearch';
import { useDevices } from '@/hooks/useDevice';
import type { Device } from '@/types/device.types';

export const DevicesList: React.FC = () => {
  const { devices, loading, error, hasMore, loadDevices, loadMore } = useDevices();

  useEffect(() => {
    if (devices.length === 0) {
      loadDevices('', true);
    }
  }, [devices, loadDevices]);

  const handleSearch = (search: string) => {
    const trimmed = search.trim();

    if (trimmed === '') {
      loadDevices('', true);
    } else {
      loadDevices(trimmed, true);
    }
  };

  const handleLoadMore = () => {
    loadMore();
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight="600" gutterBottom sx={{ mb: 3 }} fontSize={28}>
        Dispositivos
      </Typography>

      {devices.length > 0 && 
        <DeviceSearch onSearch={handleSearch} />
      }

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {devices.map((device: Device, index: number) => (
          <Grid size={{ xs: 12, md: 4 }} key={device.id_device || index}>
            <DeviceCard device={device} />
          </Grid>
        ))}
      </Grid>

      {devices.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No se encontraron dispositivos
          </Typography>
        </Box>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {hasMore && !loading && devices.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleLoadMore}
            disabled={loading}
            disableElevation
            sx={{
              textTransform: 'none',
              px: 4,
              py: 1.5,
              bgcolor: '#000',
              '&:hover': { bgcolor: '#333' },
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            Cargar más
          </Button>
        </Box>
      )}

      {!hasMore && devices.length > 0 && !loading && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            No hay más dispositivos para cargar
          </Typography>
        </Box>
      )}
    </Box>
  );
};
