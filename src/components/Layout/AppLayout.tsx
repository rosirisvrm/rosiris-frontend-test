// AppLayout.tsx
import React from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Sidebar } from './Sidebar';

export const AppLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fff' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Container maxWidth="xl" sx={{ mt: 3, px: { xs: 6, lg: 10 } }}>
          <Navigation />
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
