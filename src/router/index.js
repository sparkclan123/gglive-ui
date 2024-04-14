import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '../pages/login.vue';

import Home from '../pages/home.vue';

import NotFound from '../pages/NotFound.vue';
import axios from 'axios';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/',
        component: Home,
        name: 'home',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes

})

router.beforeEach((to, from, next) => {

let params = {};
    if(window.location.search){
        let queryParams = new URLSearchParams(window.location.search);
        for(let [key, value] of queryParams) {
            params[key] = value;
        }
    }
    if(to.name == 'login'){
        localStorage.setItem('user_params', JSON.stringify(params));
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            axios.get('/check-token', { headers: { 'Authorization': `Bearer ${access_token}` } })
                .then(response => {
                    next();
                })
                .catch(error => {
                    localStorage.removeItem('token');
                    next({ name: 'login' });
                });

        } else {
            next({ name: 'login' });
        }
    } else {
        next();
    }
});

export default router;