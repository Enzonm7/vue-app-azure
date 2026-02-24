<script setup>
    import { defineEmits } from 'vue';
    const model = defineModel ();

</script>

<template>
    <input v-model="model" placeholder="Rechercher un Pokémon">
</template>