import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import type { Character } from '@/types/character.types';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
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
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="280"
        image={character.image}
        alt={character.name}
        sx={{
          objectFit: 'cover',
          bgcolor: '#f3f4f6',
        }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" fontWeight="600" sx={{ flex: 1 }}>
            {character.name}
          </Typography>
          <Chip
            label={getStatusLabel(character.status)}
            size="small"
            sx={{
              bgcolor: getStatusColor(character.status),
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.7rem',
            }}
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {character.species}
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          {character.gender}
        </Typography>

        {/* Origen */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            Origen
          </Typography>
          <Typography variant="body2" fontWeight="500">
            {character.origin.name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
