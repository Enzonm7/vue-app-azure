import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePokemonFavoritesStore = defineStore('pokemonFavorites', () => {
  
  
  const favorites = ref([]);

  
  const addFavorite = (pokemonId) => {
    if (!favorites.value.includes(pokemonId)) {
      favorites.value.push(pokemonId);
      console.log(`Pokémon ${pokemonId} ajouté aux favoris`);
    }
  };

  const removeFavorite = (pokemonId) => {
    favorites.value = favorites.value.filter(id => id !== pokemonId);
    console.log(`Pokémon ${pokemonId} retiré des favoris`);
  };

  const toggleFavorite = (pokemonId) => {
    if (isFavorite(pokemonId)) {
      removeFavorite(pokemonId);
    } else {
      addFavorite(pokemonId);
    }
  };

  const isFavorite = (pokemonId) => {
    return favorites.value.includes(pokemonId);
  };

  const favoriteCount = computed(() => favorites.value.length);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    favoriteCount
  };
});
