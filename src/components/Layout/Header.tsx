import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: '#fff', color: '#000', px: { xs: 3, lg: 7 }, py: 1, borderBottom: '1px solid #e5e7eb' }}>
      <Toolbar sx={{ ml: { xs: 4, md: 0 } }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="600" fontSize={24}>
            Panel de Control
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gestiona tus dispositivos y contenido multimedia
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ textTransform: 'none', border: '1px solid #e5e7eb' }}
        >
          Salir
        </Button>
      </Toolbar>
    </AppBar>
  );
};
