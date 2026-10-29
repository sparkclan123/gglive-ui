import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import { clearMemberSession } from '../utils/memberSession.js';

import DefaultLayout from '../layouts/DefaultLayout.vue';
import LoginLayout from '../layouts/LoginLayout.vue';

const Login = () => import('../pages/login.vue');
const Register = () => import('../pages/register.vue');
const ResetPassword = () => import('../pages/resetPassword.vue');
const Home = () => import('../pages/home.vue');
const SeasonSelect = () => import('../pages/gglive/season.vue');
const GgLive = () => import('../pages/gglive/index.vue');
const GgLiveDetail = () => import('../pages/gglive-detail/gglive-detail.vue');
const List = () => import('../pages/gglive/list.vue');
const Challenge = () => import('../pages/gglive/challenge.vue');
const Result = () => import('../pages/gglive/result.vue');
const ResultlistGameWeek = () => import('../pages/gglive/result-gameweek-list.vue');
const ResultlistGameWeekN = () => import('../pages/gglive/result-gameweek-list-n.vue');
const News = () => import('../pages/gglive/news.vue');
const Rule = () => import('../pages/gglive/ruleweb.vue');
const Payments = () => import('../pages/payment/payment.vue');
const Rank = () => import('../pages/gglive/rank.vue');
const ExchangeReward = () => import('../pages/gglive/ExchangeReward.vue');
const History = () => import('../pages/gglive/history.vue');


const Game = () => import('../pages/game/index.vue');
const Plinko = () => import('../pages/gglive/plinko.vue');


const SelfMatchDetail = () => import('../pages/gglive/selfMatchDetail.vue');
const SelfMatchDetailPick = () => import('../pages/gglive/selfMatchDetailPickUp.vue');

const Reward = () => import('../pages/gglive/reward-detail.vue');


const PlayerPointDetail = () => import('../pages/gglive/player-point-detail.vue');
const PlayerPointDetailTable = () => import('../pages/gglive-detail/table-player-point.vue');

const Activity = () => import('../pages/activity/index.vue');



const ChallengeDetail = () => import('../pages/gglive-detail/challenge-detail.vue');
const ChallengeDetailN = () => import('../pages/gglive-detail/challenge-detail-n.vue');


const Setting = () => import('../pages/gglive/setting.vue');

const GgLiveN = () => import('../pages/gglive/indexn.vue');
const GgLiveDetailN = () => import('../pages/gglive-detail/gglive-detail-n.vue');
const GgLiveDetailEdit = () => import('../pages/gglive-detail/gglive-detail-edit.vue');
const GgLiveDetailEditNew = () => import('../pages/gglive-detail/gglive-detail-edit_new.vue');

const BigMatch = () => import('../pages/bigmatch/index.vue');

const Aff = () => import('../pages/aff/index.vue');


const Download = () => import('../pages/download.vue');

const NotFound = () => import('../pages/NotFound.vue');
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
            {
                path: '/download',
                name: 'download',
                component: Download,
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
                path: 'pitch-bigmatch/:seasonID/:gameWeekID',
                name: 'pitch-bigmatch',
                component: BigMatch,
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
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0, behavior: 'instant' };
    },
});

router.beforeEach(async (to, from, next) => {
    const params = {...to.query};
    if (to.name == 'login') {
        localStorage.setItem('user_params', JSON.stringify(params));
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            let valid = false;
            try {
                await api.get('/premier-league/v1/check-token', { headers: { 'Authorization': `Bearer ${access_token}` } });
                valid = true;
            } catch { /* Handle only the session this request actually checked. */ }
            const currentToken = localStorage.getItem('access_token');
            if (currentToken !== access_token) {
                // Another tab may have signed in, or sign-out may have completed.
                next(currentToken ? {path: to.path, query: to.query, hash: to.hash, replace: true} : {name: 'login'});
            } else if (valid) {
                next();
            } else {
                clearMemberSession(localStorage, sessionStorage, store);
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
