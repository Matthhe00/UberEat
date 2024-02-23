import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/page/homePage.vue'

const routes = [
    { path: '/', name: 'home', component: Home},

    {
        path: '/restaurant/:name',
        name: 'restaurant',
        component:  ()=>import('@/page/RestaurantPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const Vueapp = createApp(App)

Vueapp.use(router)

Vueapp.mount('#app')