import axios from 'axios';

// Instance pour PokéAPI
export const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Instance pour l'API locale (json-server)
export const teamApi = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Gestion des erreurs globale pour PokéAPI
pokeApi.interceptors.response.use(
  response => response,
  error => {
    console.error('Erreur PokéAPI:', error.message);
    return Promise.reject(error);
  }
);

// Gestion des erreurs globale pour Team API
teamApi.interceptors.response.use(
  response => response,
  error => {
    console.error('Erreur Team API:', error.message);
    return Promise.reject(error);
  }
);

export default { pokeApi, teamApi };
