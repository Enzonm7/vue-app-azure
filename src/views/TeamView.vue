<script setup>
import { ref, onMounted } from 'vue';
import { teamApi, pokeApi } from '@/services/api';

const team = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchTeam = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await teamApi.get('/team');
    
    // Pour chaque pokémon de l'équipe, récupérer ses détails depuis PokéAPI
    const teamWithDetails = await Promise.all(
      response.data.map(async (member) => {
        try {
          const details = await pokeApi.get(`/pokemon/${member.name.toLowerCase()}`);
          return {
            id: member.id,
            name: member.name,
            image: details.data.sprites.front_default,
            types: details.data.types.map(t => t.type.name),
            apiId: details.data.id
          };
        } catch (err) {
          return {
            id: member.id,
            name: member.name,
            image: null,
            types: [],
            apiId: null
          };
        }
      })
    );
    
    team.value = teamWithDetails;
    console.log(`${team.value.length} pokémon(s) dans l'équipe`);
  } catch (err) {
    error.value = 'Impossible de récupérer l\'équipe. Vérifiez que json-server est lancé.';
    console.error('Erreur lors de la récupération de l\'équipe:', err);
  } finally {
    loading.value = false;
  }
};

const releasePokemon = async (pokemonId) => {
  try {
    await teamApi.delete(`/team/${pokemonId}`);
    console.log(`Pokémon ${pokemonId} relâché`);
    
    // Recharger la liste
    await fetchTeam();
  } catch (err) {
    console.error('Erreur lors de la suppression:', err);
    alert('Impossible de relâcher ce pokémon');
  }
};

onMounted(() => {
  fetchTeam();
});
</script>

<template>
  <div class="team-view">
    <div class="header">
      <h1>Mon Équipe Pokémon</h1>
      <button @click="fetchTeam" class="btn-refresh">Actualiser</button>
    </div>

    <div v-if="loading" class="loading">
      <p>Chargement de l'équipe...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <p class="hint">Lancez json-server avec : <code>json-server --watch db.json --port 3001</code></p>
    </div>

    <div v-else-if="team.length === 0" class="empty-team">
      <p>Votre équipe est vide</p>
      <p>Capturez des pokémons depuis la <RouterLink to="/pokemons">liste des pokémons</RouterLink></p>
    </div>

    <div v-else class="team-container">
      <p class="team-count">{{ team.length }} pokémon(s) capturé(s)</p>
      
      <div class="team-grid">
        <div v-for="pokemon in team" :key="pokemon.id" class="team-card">
          <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image">
          <h3>{{ pokemon.name }}</h3>
          <div class="types">
            <span v-for="type in pokemon.types" :key="type" :class="['type-badge', type]">
              {{ type }}
            </span>
          </div>
          
          <button @click="releasePokemon(pokemon.id)" class="btn-release">
            Relâcher
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #42b983;
  font-size: 2rem;
}

.btn-refresh {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-refresh:hover {
  background-color: #359268;
  transform: scale(1.05);
}

.loading, .error, .empty-team {
  text-align: center;
  padding: 3rem;
  color: #42b983;
  font-size: 1.2rem;
}

.error {
  color: #ff6b6b;
}

.hint {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #888;
}

.hint code {
  background-color: rgba(66, 185, 131, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: #42b983;
}

.empty-team a {
  color: #42b983;
  text-decoration: underline;
}

.team-count {
  text-align: center;
  font-size: 1.2rem;
  color: #42b983;
  margin-bottom: 2rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.team-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s;
  border: 2px solid #42b983;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(66, 185, 131, 0.3);
}

.pokemon-image {
  width: 120px;
  height: 120px;
  margin-bottom: 1rem;
}

.team-card h3 {
  color: #42b983;
  margin-bottom: 1rem;
}

.types {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.type-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  color: white;
  font-size: 0.85rem;
  font-weight: bold;
}

/* Types de pokémons */
.grass, .plante { background-color: #78C850; }
.fire, .feu { background-color: #EE7D2F; }
.water, .eau { background-color: #648CF0; }
.electric, .electrik { background-color: #F5CD29; }
.normal { background-color: #A8A878; }
.poison { background-color: #A040A0; }
.ground { background-color: #E0C068; }
.fairy { background-color: #EE99AC; }
.bug { background-color: #A8B820; }
.fighting { background-color: #C03028; }
.psychic { background-color: #F85888; }
.rock { background-color: #B8A038; }
.ghost { background-color: #705898; }
.ice { background-color: #98D8D8; }
.dragon { background-color: #7038F8; }
.dark { background-color: #705848; }
.steel { background-color: #B8B8D0; }
.flying { background-color: #A890F0; }

.btn-release {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  transition: all 0.3s;
}

.btn-release:hover {
  background-color: #ff5252;
  transform: scale(1.05);
}
</style>
