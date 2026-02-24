<script setup>
  import PokemonCard from '@/components/PokemonCard.vue';
  import SearchInput from '@/components/SearchInput.vue';
  import { ref, computed, onMounted } from 'vue';
  import { usePokemonFavoritesStore } from '@/stores/pokemonFavorites';
  import { usePokemonDataStore } from '@/stores/pokemonData';
  import { teamApi } from '@/services/api';

  const favoritesStore = usePokemonFavoritesStore();
  const pokemonDataStore = usePokemonDataStore();

  const handlerChildData = (pokemon) => {
    stock.value = pokemon.name;
    // console.log(pokemon);
  }

  const search = ref('');
  const showOnlyFavorites = ref(false);

  const mesPoke = computed(() => pokemonDataStore.getAllPokemons());

  const listeFiltree = computed(() => {
    let filtered = mesPoke.value.filter((pokemon) => {
     return pokemon.name.toLowerCase().includes(search.value)
    })
    
    if (showOnlyFavorites.value) {
      filtered = filtered.filter((pokemon) => favoritesStore.isFavorite(pokemon.id));
    }
    
    return filtered;
  });

  const stock = ref('');

  const capturePokemon = async (pokemon) => {
    try {
      await teamApi.post('/team', {
        name: pokemon.name
      });
      console.log(`${pokemon.name} capturé !`);
      alert(`${pokemon.name} a été ajouté à votre équipe !`);
    } catch (err) {
      console.error('Erreur lors de la capture:', err);
      alert('Impossible de capturer ce pokémon. Vérifiez que json-server est lancé.');
    }
  };

  onMounted(async () => {
    await pokemonDataStore.fetchPokemons(50, 0);
  });

</script>

<template>

    <main>
    <SearchInput v-model="search" />
    
    <div class="filter-container">
      <label>
        <input 
          type="checkbox" 
          v-model="showOnlyFavorites"
        >
        Afficher les favoris ({{ favoritesStore.favoriteCount }})
      </label>
    </div>
    
    <div v-if="pokemonDataStore.loading" class="loading">
      <p>Chargement des pokémons depuis l'API...</p>
    </div>
    
    <div v-else-if="pokemonDataStore.error" class="error">
      <p>Erreur : {{ pokemonDataStore.error }}</p>
    </div>
    
    <div v-else>
      <p v-if="stock.length != 0">Vous avez sélectionné : {{ stock }}</p>
      <div class="titre">
        <h1>Liste des Pokémons</h1>
        <p>{{ mesPoke.length }} Pokémon dans le Pokédex</p> 
      </div>
      <br>
      <p v-if="listeFiltree.length == 0">Aucun pokémon trouvé</p>
      <div class="poke-container">
          <div v-for="monPokemon in listeFiltree" :key="monPokemon.id" class="pokemon-wrapper">
              <RouterLink :to="`/pokemons/${monPokemon.id}`" class="pokemon-link">
                  <PokemonCard :pokemon="monPokemon" @select="handlerChildData">
                    <button 
                      v-if="favoritesStore.isFavorite(monPokemon.id)"
                      @click.prevent="favoritesStore.removeFavorite(monPokemon.id)"
                      class="btn-favorite btn-remove"
                      title="Retirer des favoris"
                    >
                      ❤️ Favori
                    </button>
                    <button 
                      v-else
                      @click.prevent="favoritesStore.addFavorite(monPokemon.id)"
                      class="btn-favorite btn-add"
                      title="Ajouter aux favoris"
                    >
                      🤍 Ajouter
                    </button>
                  </PokemonCard>
              </RouterLink>
              
              <button 
                @click.stop="capturePokemon(monPokemon)"
                class="btn-capture"
                title="Capturer ce pokémon"
              >
                Capturer
              </button>
          </div>   
      </div>
    </div>
  </main>

</template>

<style scoped>

header {
  line-height: 1.5;
}

/* MODIFICATION : Messages de chargement et d'erreur */
.loading, .error {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
}

.loading {
  color: #42b983;
}

.error {
  color: #ff6b6b;
}

/* MODIFICATION 4.3 : Style pour le conteneur de filtre */
.filter-container {
  background-color: rgba(66, 185, 131, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
  color: #42b983;
}

.filter-container label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
}

.filter-container input[type="checkbox"] {
  cursor: pointer;
  width: 18px;
  height: 18px;
}

.poke-container{
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
}

/* MODIFICATION : Wrapper pour chaque pokémon avec carte + bouton capturer */
.pokemon-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pokemon-link {
  text-decoration: none;
  position: relative;
}

/* MODIFICATION 4.2 : Style pour les boutons favoris */
.btn-favorite {
  padding: 0.4rem 0.6rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 0.5rem;
}

.btn-add {
  background-color: #e8e8e8;
  color: #333;
  border: 2px solid #ddd;
}

.btn-add:hover {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
  transform: scale(1.05);
}

.btn-remove {
  background-color: #ff6b6b;
  color: white;
  border: 2px solid #ff5252;
}

.btn-remove:hover {
  background-color: #ff5252;
  transform: scale(1.05);
}

/* MODIFICATION : Bouton Capturer pour ajouter à l'équipe */
.btn-capture {
  padding: 0.6rem 1rem;
  background-color: #4169e1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-capture:hover {
  background-color: #1e3a8a;
  transform: scale(1.05);
}

.titre {
    color: white;
    text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

</style>