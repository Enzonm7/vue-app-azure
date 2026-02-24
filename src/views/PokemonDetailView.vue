<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { usePokemonDataStore } from '@/stores/pokemonData';
    
    const route = useRoute();
    const pokemonDataStore = usePokemonDataStore();
    
    const pokemon = ref(null);
    const loading = ref(true);
    const error = ref(null);

    onMounted(async () => {
      try {
        loading.value = true;
        pokemon.value = await pokemonDataStore.fetchPokemonDetails(route.params.id);
        console.log(`Détails de ${pokemon.value.name} récupérés`);
      } catch (err) {
        error.value = 'Pokémon non trouvé';
        console.error('Erreur:', err);
      } finally {
        loading.value = false;
      }
    });
</script>

<template>
    <div v-if="loading" class="loading">
        <p>Chargement des détails...</p>
    </div>
    
    <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
        <button @click="$router.push('/pokemons')" class="btn-back">⬅ Retour à la liste</button>
    </div>

    <div v-else-if="pokemon" class="pokemon-detail">
        <button @click="$router.push('/pokemons')" class="btn-back">⬅ Retour à la liste</button>
        
        <div class="detail-card">
            <h1>{{ pokemon.name }}</h1>
            <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-img">
            
            <div class="info-section">
                <p><strong>ID:</strong> #{{ pokemon.id }}</p>
                
                <p><strong>Types:</strong></p>
                <div class="types">
                    <span v-for="type in pokemon.types" :key="type" :class="['type-badge', type]">
                        {{ type }}
                    </span>
                </div>
                
                <p><strong>Taille:</strong> {{ (pokemon.height / 10).toFixed(1) }} m</p>
                <p><strong>Poids:</strong> {{ (pokemon.weight / 10).toFixed(1) }} kg</p>
                
                <p><strong>Capacités:</strong></p>
                <ul class="abilities">
                    <li v-for="ability in pokemon.abilities" :key="ability">{{ ability }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.loading {
    text-align: center;
    padding: 3rem;
    color: #42b983;
    font-size: 1.2rem;
}

.pokemon-detail {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
}

.btn-back {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 2rem;
    transition: background-color 0.3s;
}

.btn-back:hover {
    background-color: #359268;
}

.detail-card {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.detail-card h1 {
    color: #42b983;
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.pokemon-img {
    width: 200px;
    height: 200px;
    margin: 1rem 0;
}

.info-section {
    margin-top: 2rem;
    color: white;
}

.info-section p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
}

.types {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin: 1rem 0;
}

.type-badge {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    color: white;
    font-weight: bold;
}

.electrik, .electric { background-color: #F5CD29; }
.plante, .grass { background-color: #78C850; }
.feu, .fire { background-color: #EE7D2F; }
.eau, .water { background-color: #648CF0; }
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

.abilities {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
}

.abilities li {
    background-color: rgba(66, 185, 131, 0.2);
    padding: 0.5rem 1rem;
    margin: 0.5rem auto;
    border-radius: 5px;
    max-width: 300px;
}

.error-message {
    text-align: center;
    padding: 3rem;
    color: #ff6b6b;
}

.error-message p {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}
</style>