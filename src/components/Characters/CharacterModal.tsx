import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Grid,
  Chip,
  Divider,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { Character } from '@/types/character.types';

interface CharacterModalProps {
  character: Character | null;
  open: boolean;
  onClose: () => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({ character, open, onClose }) => {
  if (!character) return null;

  const getStatusColor = (status: Character['status']): string => {
    switch (status) {
      case 'Alive':
        return '#10b981';
      case 'Dead':
        return '#ef4444';
      default:
        return '#f59e0b';
    }
  };

  const getStatusLabel = (status: Character['status']): string => {
    switch (status) {
      case 'Alive':
        return 'Vivo';
      case 'Dead':
        return 'Muerto';
      default:
        return 'Desconocido';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ '& .MuiDialog-paper': { borderRadius: 3 } }}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 3, px: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h5" fontWeight="700">
            {character.name}
          </Typography>
          <Chip
            label={getStatusLabel(character.status)}
            sx={{
              bgcolor: getStatusColor(character.status),
              color: '#fff',
              fontWeight: 600,
            }}
          />
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 4, pb: 3 }}>
        <Grid container spacing={4}>
          {/* Imagen */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              component="img"
              src={character.image}
              alt={character.name}
              sx={{
                width: '100%',
                borderRadius: 3,
                boxShadow: 2,
              }}
            />

            {/* Información básica */}
            <Box sx={{ mt: 2 }}>
              <InfoRow label="ID" value={`#${character.id}`} />
              <InfoRow label="Estado" value={getStatusLabel(character.status)} />
              <InfoRow label="Especie" value={character.species} />
              {character.type && <InfoRow label="Tipo" value={character.type} />}
              <InfoRow label="Género" value={character.gender} />
            </Box>
          </Grid>

          {/* Información detallada */}
          <Grid size={{ xs: 12, md: 7 }}>
            {/* Origen */}
            <Typography variant="h6" fontWeight="600" gutterBottom>
              Origen
            </Typography>
            <Box sx={{ mb: 2, p: 2, bgcolor: '#f3f4f6', borderRadius: 2 }}>
              <Typography variant="body1" fontWeight="500">
                {character.origin.name}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Ubicación Actual */}
            <Typography variant="h6" fontWeight="600" gutterBottom>
              Última Ubicación Conocida
            </Typography>
            <Box sx={{ mb: 2, p: 2, bgcolor: '#f3f4f6', borderRadius: 2 }}>
              <Typography variant="body1" fontWeight="500">
                {character.location.name}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Episodios */}
            <Typography variant="h6" fontWeight="600" gutterBottom>
              Apariciones
            </Typography>
            <Box sx={{ p: 2, bgcolor: '#f3f4f6', borderRadius: 2 }}>
              <Typography variant="body1" fontWeight="500">
                {character.episode.length} episodio{character.episode.length !== 1 ? 's' : ''}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Primera aparición: Episodio {character.episode[0]?.split('/').pop()}
              </Typography>
            </Box>

            {/* Fecha de creación */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Creado: {new Date(character.created).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

// Componente helper para mostrar filas de información
interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <Box sx={{ display: 'flex', mb: 1 }}>
    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100, fontWeight: 500 }}>
      {label}:
    </Typography>
    <Typography variant="body2" sx={{ flex: 1 }}>
      {value}
    </Typography>
  </Box>
);
