import axios from 'axios';
import type { Character, CharactersResponse } from '@/types/character.types';

const RICK_MORTY_API_BASE = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (page: number = 1): Promise<CharactersResponse> => {
  try {
    const response = await axios.get<CharactersResponse>(
      `${RICK_MORTY_API_BASE}/character?page=${page}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al cargar personajes');
  }
};

export const fetchCharacterById = async (id: number): Promise<Character> => {
  try {
    const response = await axios.get<Character>(
      `${RICK_MORTY_API_BASE}/character/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al cargar personaje');
  }
};

export const searchCharacters = async (name: string): Promise<CharactersResponse> => {
  try {
    const response = await axios.get<CharactersResponse>(
      `${RICK_MORTY_API_BASE}/character?name=${name}`
    );
    return response.data;
  } catch (error) {
    throw new Error('No se encontraron personajes');
  }
};
