<script setup>

</script>

<template>
  <div id="app">
    <h1 class="app-title">Pokédex</h1>
    
    <nav class="main-nav">
      <RouterLink to="/home">Accueil</RouterLink>
      <span class="separator">|</span>
      <RouterLink to="/pokemons">Pokémons</RouterLink>
      <span class="separator">|</span>
      <RouterLink to="/team">Mon Équipe</RouterLink>
    </nav>
    
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 2rem;
}

.app-title {
  text-align: center;
  font-size: 3rem;
  color: #42b983;
  margin: 0 0 1rem 0;
  font-weight: bold;
}

.main-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.main-nav a {
  color: #42b983;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s;
}

.main-nav a:hover {
  background-color: rgba(66, 185, 131, 0.1);
  transform: scale(1.05);
}

.main-nav a.router-link-active {
  background-color: #42b983;
  color: white;
}

.separator {
  color: #42b983;
  opacity: 0.5;
}

main {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
