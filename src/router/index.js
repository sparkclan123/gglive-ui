import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

import DefaultLayout from '../layouts/DefaultLayout.vue';
import LoginLayout from '../layouts/LoginLayout.vue';

import Login from '../pages/login.vue';
import Home from '../pages/home.vue';
import SeasonSelect from '../pages/gglive/season.vue';
import GgLive from '../pages/gglive/index.vue';
import List from '../pages/gglive/list.vue';
import Challenge from '../pages/gglive/challenge.vue';
import Result from '../pages/gglive/result.vue';
import ResultlistGameWeek from '../pages/gglive/result-gameweek-list.vue';
import News from '../pages/gglive/news.vue';
import Payments from '../pages/payment/payment.vue';


import ChallengeDetail from '../pages/gglive-detail/challenge-detail.vue';
import GgLiveDetail from '../pages/gglive-detail/gglive-detail.vue';

import NotFound from '../pages/NotFound.vue';
import { api } from '@axios_inst';

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
        meta: { requiresAuth: true },
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
                path: 'pitch/:seasonID/:gameWeekID',
                name: 'pitch',
                component: GgLive,
            },
            {
                path: 'list',
                name: 'list',
                component: List,
            },
            {
                path: 'challenge',
                name: 'challenge',
                component: Challenge,
            },
            
            {
                path: 'pitch-detail/:id',
                name: 'pitch-detail',
                component: GgLiveDetail,
            },
            {
                path: 'challenge-detail/:id',
                name: 'challenge-detail',
                component: ChallengeDetail,
            },
            {
                path: 'news',
                name: 'news',
                component: News,
            },

            {
                path: 'result',
                name: 'result',
                component: Result,
            },
            {
                path: 'result-list-gameweek/:gameWeekID',
                name: 'result-list-gameweek',
                component: ResultlistGameWeek,
            },

            {
                path: 'payments',
                name: 'payments',
                component: Payments,
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

router.beforeEach(async (to, from, next) => {
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
            try {
                await api.get('/premier-league/v1/check-token', { headers: { 'Authorization': `Bearer ${access_token}` } });
                // await store.dispatch('ticket/facthTicket'); // 
                next();
            } catch (error) {
                localStorage.removeItem('token');
                next({ name: 'login' });
            }
        } else {
            next({ name: 'login' });
        }
    } else {
        next();
    }
});

export default router;
