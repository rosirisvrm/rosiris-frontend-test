import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import type { Device } from '@/types/device.types';


interface DeviceCardProps {
  device: Device;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 1,
        },
        borderRadius: 3,
        border: '1px solid #e5e7eb',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box 
            component="img" 
            sx={{ 
              mr: 2, 
              width: 150, 
              height: 200, 
              objectFit: 'fill', 
              bgColor: '#f3f4f6', 
              borderRadius: 5,
            }} 
            src={device.photo} 
            alt={device.device_name}
          >
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="600">
              {device.device_name || 'Dispositivo'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Modelo: &nbsp;
              {device.device_model || ''} {device.factory_family || ''}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fabricante: &nbsp;
              {device.factory_family || ''}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Serial: &nbsp;
            {device.settings_device.serial || ''}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
