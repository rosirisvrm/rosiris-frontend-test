// components/Sidebar.tsx
import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@/store';

export const Sidebar: React.FC = () => {
  const modules = useSelector((state: RootState) => state.auth.user?.modules);
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          pt: 4, 
          bgcolor: '#f9f9f9',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Box sx={{ px: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
          Menú
        </Typography>
        <Divider />
        <List>
          {modules?.map((mod: any, index: any) => (
            <ListItemButton
              key={index}
              onClick={() => navigate(mod.route)}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  bgcolor: '#e0f7fa',
                },
              }}
            >
              <ListItemText
                primary={mod.name}
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: '#555',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
