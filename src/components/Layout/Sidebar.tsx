import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@/store';

export const Sidebar: React.FC = () => {
  const modules = useSelector((state: RootState) => state.auth.user?.modules);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  const drawerContent = (
    <Box sx={{ px: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
        Menú
      </Typography>
      <Divider />
      <List>
        {modules?.map((mod, index) => (
          <ListItemButton
            key={index}
            onClick={() => {
              navigate(mod.route);
              if (isMobile) setOpen(false);
            }}
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
  );

  return (
    <>
      {isMobile ? (
        <>
          {!open && (
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
            >
              <MenuIcon />
            </IconButton>
            )}
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)} sx={{ 
              [`& .MuiDrawer-paper`]: {
                pt: { xs: 14, sm: 4 },
              },
            }}>
              {drawerContent}
            </Drawer>
        </>
      ) : (
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
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};
