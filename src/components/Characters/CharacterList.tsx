import React, { useState } from 'react';
import { Box, Grid, CircularProgress, Alert, Typography, Pagination } from '@mui/material';
import { CharacterCard } from './CharacterCard';
import { CharacterModal } from './CharacterModal';
import { useCharacters } from '@/hooks/useCharacters';
import type { Character } from '@/types/character.types';

export const CharacterList: React.FC = () => {
  const { characters, loading, error, currentPage, totalPages, loadPage } = useCharacters();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleCardClick = (character: Character): void => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = (): void => {
    setSelectedCharacter(null);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    console.log('event :', event);
    loadPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && characters.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 3 }}>
        <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto' }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight="600" gutterBottom sx={{ mb: 4 }} fontSize={28}>
        Personajes de Rick and Morty
      </Typography>

      <Grid container spacing={3}>
        {characters.map((character: Character) => (
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 4 }} key={character.id}>
            <CharacterCard character={character} onClick={() => handleCardClick(character)} />
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Paginación */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </Box>

      <CharacterModal character={selectedCharacter} open={!!selectedCharacter} onClose={handleCloseModal} />
    </Box>
  );
};
