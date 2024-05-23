import { createRouter, createWebHistory } from 'vue-router';

import DefaultLayout from '../layouts/DefaultLayout.vue';
import LoginLayout from '../layouts/LoginLayout.vue';

import Login from '../pages/login.vue';
import Home from '../pages/home.vue';
import SeasonSelect from '../pages/gglive/season.vue';
import GgLive from '../pages/gglive/index.vue';

import NotFound from '../pages/NotFound.vue';
import axios from 'axios';

const routes = [
    {
        path: '/login',
        component: LoginLayout,
        children: [
            {
                path: '',
                name: 'login',
                component: Login,
            },
        ],
    },
    {
        path: '/',
        component: DefaultLayout,
        // meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'home',
                component: Home,
            },
            {
                path: 'season-select',
                name: 'season-select',
                component: SeasonSelect,
            },
            {
                path: 'pitch',
                name: 'pitch',
                component: GgLive,
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    let params = {};
    if (window.location.search) {
        let queryParams = new URLSearchParams(window.location.search);
        for (let [key, value] of queryParams) {
            params[key] = value;
        }
    }
    if (to.name == 'login') {
        localStorage.setItem('user_params', JSON.stringify(params));
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            axios.get('/user/m/check-token', { headers: { 'Authorization': `Bearer ${access_token}` } })
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
