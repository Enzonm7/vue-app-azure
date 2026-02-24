import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PokemonListView from "@/views/PokemonListView.vue";
import PokemonDetailView from "@/views/PokemonDetailView.vue";
import NotFoundView from '@/views/NotFoundView.vue'
import TeamView from '@/views/TeamView.vue'

const routes =  [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: HomeView },
    { path: '/pokemons', name: 'Liste',component: PokemonListView},
    {path: '/pokemons/:id', name: 'Détail', component: PokemonDetailView},
    { path: '/team', name: 'Team', component: TeamView },
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView}

];

const Router = createRouter ({ 
    history: createWebHistory(),
    routes,
});

export default Router;
