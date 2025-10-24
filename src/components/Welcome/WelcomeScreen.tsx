import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import {
  Devices as DevicesIcon,
  People as PeopleIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ModuleCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  path: string;
  features: string[];
}

export const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const modules: ModuleCard[] = [
    {
      title: 'Dispositivos',
      description: 'Gestiona y monitorea todos tus dispositivos conectados en tiempo real',
      icon: <DevicesIcon sx={{ fontSize: 48 }} />,
      color: '#3b82f6',
      bgColor: '#eff6ff',
      path: '/devices',
      features: ['Ver dispositivos online', 'Búsqueda avanzada', 'Detalles completos'],
    },
    {
      title: 'Personajes Rick and Morty',
      description: 'Explora el universo de Rick and Morty con todos sus personajes',
      icon: <PeopleIcon sx={{ fontSize: 48 }} />,
      color: '#10b981',
      bgColor: '#f0fdf4',
      path: '/characters',
      features: ['800+ personajes', 'Información detallada', 'Paginación'],
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="700" gutterBottom fontSize={36}>
          ¡Bienvenido de vuelta!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>
          {user?.email || 'Usuario'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mt: 1 }}>
          Selecciona un módulo para comenzar a gestionar tu contenido
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {modules.map((module, index) => (
          <Grid size={{ xs: 12, md: 5 }} key={index}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 1,
                },
                borderRadius: 3,
                border: '1px solid #e5e7eb',
              }}
              onClick={() => navigate(module.path)}
            >
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 60,
                    borderRadius: 3,
                    bgcolor: module.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    color: module.color,
                  }}
                >
                  {module.icon}
                </Box>

                <Typography variant="h5" fontWeight="600" gutterBottom>
                  {module.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flex: 1 }}>
                  {module.description}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  {module.features.map((feature, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: module.color,
                          mr: 1.5,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Button
                  variant="contained"
                  endIcon={<ArrowIcon />}
                  fullWidth
                  disableElevation
                  sx={{
                    bgcolor: module.color,
                    textTransform: 'none',
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: module.color,
                      opacity: 0.9,
                    },
                  }}
                >
                  Acceder a {module.title}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
