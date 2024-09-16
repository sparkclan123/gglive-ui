import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

import DefaultLayout from '../layouts/DefaultLayout.vue';
import LoginLayout from '../layouts/LoginLayout.vue';

import Login from '../pages/login.vue';
import Register from '../pages/register.vue';
import ResetPassword from '../pages/resetPassword.vue';
import Home from '../pages/home.vue';
import SeasonSelect from '../pages/gglive/season.vue';
import GgLive from '../pages/gglive/index.vue';
import GgLiveDetail from '../pages/gglive-detail/gglive-detail.vue';
import List from '../pages/gglive/list.vue';
import Challenge from '../pages/gglive/challenge.vue';
import Result from '../pages/gglive/result.vue';
import ResultlistGameWeek from '../pages/gglive/result-gameweek-list.vue';
import ResultlistGameWeekN from '../pages/gglive/result-gameweek-list-n.vue';
import News from '../pages/gglive/news.vue';
import Rule from '../pages/gglive/ruleweb.vue';
import Payments from '../pages/payment/payment.vue';
import Rank from '../pages/gglive/rank.vue';
import ExchangeReward from '../pages/gglive/ExchangeReward.vue';
import History from '../pages/gglive/history.vue';


import Game from '../pages/game/index.vue';
import Plinko from '../pages/gglive/plinko.vue';


import SelfMatchDetail from '../pages/gglive/selfMatchDetail.vue';
import SelfMatchDetailPick from '../pages/gglive/selfMatchDetailPickUp.vue';

import Reward from '../pages/gglive/reward-detail.vue';


import PlayerPointDetail from '../pages/gglive/player-point-detail.vue';
import PlayerPointDetailTable from '../pages/gglive-detail/table-player-point.vue';

import Activity from '../pages/activity/index.vue';



import ChallengeDetail from '../pages/gglive-detail/challenge-detail.vue';
import ChallengeDetailN from '../pages/gglive-detail/challenge-detail-n.vue';


import Setting from '../pages/gglive/setting.vue';

import GgLiveN from '../pages/gglive/indexn.vue';
import GgLiveDetailN from '../pages/gglive-detail/gglive-detail-n.vue';
import GgLiveDetailEdit from '../pages/gglive-detail/gglive-detail-edit.vue';
import GgLiveDetailEditNew from '../pages/gglive-detail/gglive-detail-edit_new.vue';

import Aff from '../pages/aff/index.vue';

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
            {
                path: '/register',
                name: 'register',
                component: Register,
            },
            {
                path: '/reset-password',
                name: 'reset-password',
                component: ResetPassword,
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
                path: 'pitch-n/:seasonID/:gameWeekID',
                name: 'pitch-n',
                component: GgLiveN,
            },
            {
                path: 'list',
                name: 'list',
                component: List,
            },
            {
                path: 'rank',
                name: 'rank',
                component: Rank,
            },
            {
                path: 'history',
                name: 'history',
                component: History,
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
                path: 'pitch-detail-n/:id',
                name: 'pitch-detail-n',
                component: GgLiveDetailN,
            },
            {
                path: 'pitch-detail-edit/:id/:type',
                name: 'pitch-detail-edit',
                component: GgLiveDetailEdit,
            },
            {
                path: 'pitch-detail-edit-new/:id/:type',
                name: 'pitch-detail-edit-new',
                component: GgLiveDetailEditNew,
            },
            
            {
                path: 'challenge-detail/:id',
                name: 'challenge-detail',
                component: ChallengeDetail,
            },
            {
                path: 'challenge-detail-n/:id',
                name: 'challenge-detail-n',
                component: ChallengeDetailN,
            },
            {
                path: 'self-match-detail/:id/:gameWeekID',
                name: 'self-match-detail',
                component: SelfMatchDetail,
            },
            {
                path: 'self-match-detail-pick/:id',
                name: 'self-match-detail-pick',
                component: SelfMatchDetailPick,
            },
            {
                path: 'reward-detail/:id/:type',
                name: 'reward-detail',
                component: Reward,
            },
            {
                path: 'player-detail-point',
                name: 'player-detail-point',
                component: PlayerPointDetail,
            },
            {
                path: 'player-detail-point-table/:id/:seasonID',
                name: 'player-detail-point-table',
                component: PlayerPointDetailTable,
            },
            {
                path: 'news',
                name: 'news',
                component: News,
            },
            {
                path: 'exchangereward',
                name: 'exchangereward',
                component: ExchangeReward,
            },
            {
                path: 'activity',
                name: 'activity',
                component: Activity,
            },
            
            {
                path: 'rule',
                name: 'rule',
                component: Rule,
            },
            
            {
                path: 'game',
                name: 'game',
                component: Game,
            },
            {
                path: 'game-00001',
                name: 'game-00001',
                component: Plinko,
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
                path: 'result-list-gameweek-n/:gameWeekID',
                name: 'result-list-gameweek-n',
                component: ResultlistGameWeekN,
            },

            {
                path: 'payments',
                name: 'payments',
                component: Payments,
            },
            {
                path: 'aff-my',
                name: 'aff-my',
                component: Aff,
            },
            
            {
                path: 'setting',
                name: 'setting',
                component: Setting,
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
                window.scrollTo(0, 0);
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
