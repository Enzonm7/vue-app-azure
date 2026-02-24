import { defineStore } from 'pinia';
import { ref } from 'vue';
import { pokeApi } from '@/services/api';

export const usePokemonDataStore = defineStore('pokemonData', () => {
  
  const pokemons = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchPokemons = async (limit = 50, offset = 0) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await pokeApi.get(`/pokemon?limit=${limit}&offset=${offset}`);
      pokemons.value = response.data.results.map((pokemon, index) => ({
        id: offset + index + 1,
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        url: pokemon.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`
      }));
      
      console.log(`${pokemons.value.length} pokémons récupérés depuis l'API`);
    } catch (err) {
      error.value = err.message;
      console.error('Erreur lors de la récupération des pokémons:', err);
    } finally {
      loading.value = false;
    }
  };

  const fetchPokemonDetails = async (nameOrId) => {
    try {
      const response = await pokeApi.get(`/pokemon/${nameOrId}`);
      const data = response.data;
      
      return {
        id: data.id,
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        image: data.sprites.front_default,
        types: data.types.map(t => t.type.name),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map(a => a.ability.name)
      };
    } catch (err) {
      console.error('Erreur lors de la récupération des détails:', err);
      throw err;
    }
  };

  const getPokemonById = (id) => {
    return pokemons.value.find(pokemon => pokemon.id === parseInt(id));
  };

  const getAllPokemons = () => {
    return pokemons.value;
  };

  return {
    pokemons,
    loading,
    error,
    fetchPokemons,
    fetchPokemonDetails,
    getPokemonById,
    getAllPokemons
  };
});
