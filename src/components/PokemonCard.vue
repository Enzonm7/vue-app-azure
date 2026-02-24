<script setup>
    import { defineEmits } from 'vue';

    defineProps ({
        pokemon: {
            type: Object,
            required: true
        }
    })

    const emit = defineEmits (['select']);
    const sendDataToParent = (pokemon) => {
    emit('select', pokemon);
    const model = defineModel ();
};

</script>

<template>
    
    <div 
        @click="sendDataToParent(pokemon)"
        :class="['card', pokemon.type ? pokemon.type.toLowerCase() : 'default']">
        <img :src="pokemon.image" :alt="pokemon.name">
        <h3 class="nom">{{ pokemon.name }}</h3>
        <span v-if="pokemon.type" class="type-badge">
            {{ pokemon.type }}
        </span>
        <div v-else-if="pokemon.types" class="types-container">
            <span v-for="type in pokemon.types" :key="type" class="type-badge">
                {{ type }}
            </span>
        </div>
        <slot></slot>
    </div>
    
</template>

<style scoped>

.card {
    border-radius: 10px;
    width: 120px;
    display: flex;            
    flex-direction: column;   
    align-items: center;
    transition: transform 0.1s; 
    cursor: pointer;
}

.card:hover {
  transform: scale(1.05); 
}


.nom {
    color: black;
    font-weight: bold;
}

.type-badge {
    color: white;
    padding: auto;
    border-radius: 5px;
    margin-bottom: 5px;
}

.types-container {
    display: flex;
    gap: 0.3rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 5px;
}

.slot {
    color: red;
}

.electrik {
    background-color: #FFF5E6;
}

.electrik .type-badge {
    background-color: #F5CD29;
    color: white
}

.plante {
    background-color: #E6F5E6;
}

.plante .type-badge {
    background-color: #78C850;
    color: white;
}

.feu {
    background-color: #FFEBEB;
}

.feu .type-badge {
    background-color: #EE7D2F;
    color: white;
}

.eau {
    background-color: #E1F0FA;
}

.eau .type-badge {
    background-color: #648CF0;
    color: white;
}

.normal {
    background-color: #F5F5F5;
}

.normal .type-badge {
    background-color: #A8A878;
    color: white;
}

.default {
    background-color: #F0F0F0;
}

.default .type-badge {
    background-color: #999;
    color: white;
}
    /* background-color: #FAFAFA;
} */

.normal .type-badge {
    background-color: #A5A578;
    color: white;
}

</style>