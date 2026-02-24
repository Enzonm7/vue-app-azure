import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import { createPinia } from 'pinia'

const app = createApp(App);
app.use(createPinia());
app.use(Router);
app.mount('#app');
