import React, { useState, type FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('carlospea13+1@gmail.com');
  const [password, setPassword] = useState<string>('123456');
  const { login, loading, error, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/welcome');
    }
  }, [isAuthenticated, navigate]);


  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.type.includes('fulfilled')) {
      navigate('/welcome');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" fontWeight="600" gutterBottom fontSize={32}>
            Bienvenido
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ingresa tus credenciales para acceder
          </Typography>
        </Box>

        <Card elevation={0} sx={{ bgcolor: '#fff', borderRadius: 3, border: '1px solid #e5e7eb' }}>
          <CardContent sx={{ p: 5 }}>
            <Typography variant="h5" fontWeight="600" gutterBottom fontSize={24}>
              Iniciar Sesión
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Ingresa tu correo y contraseña
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
                Correo Electrónico
              </Typography>
              <TextField
                fullWidth
                placeholder="Ingresa tu correo electrónico (ejemplo@gmail.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2, '& .MuiInputBase-root': { borderRadius: 2 } }}
                required
                type="email"
              />

              <Typography variant="body2" fontWeight="500" sx={{ mb: 1 }}>
                Contraseña
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingresa tu contraseña (al menos 6 caracteres)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  mb: 2,
                  '& .MuiInputBase-root': {
                    borderRadius: 2,
                    '::-ms-reveal': { display: 'none' },
                    'input::-ms-reveal': { display: 'none' },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleVisibility} edge="end" sx={{ mr: 0 }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                disableElevation
                sx={{
                  bgcolor: '#000',
                  color: '#fff',
                  '&:hover': { bgcolor: '#333' },
                  textTransform: 'none',
                  py: 1.5,
                  borderRadius: 2,
                  mt: 2,
                  boxShadow: 'none',
                  mb: 2
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Ingresar'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
