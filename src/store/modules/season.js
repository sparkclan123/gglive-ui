
import { api } from '@axios_inst';
const season = {
    namespaced: true,
    state: {
        seasons: []
    },
    getters: {
        getSeasons(state) {
            return state.seasons;
        }
    },
    mutations: {
        setSeasons(state, seasons) {
            state.seasons = seasons;
        },
        addSeason(state, season) {
            state.seasons.push(season);
        }
    },
    actions: {
        addSeason({ commit }, season) {
            commit('addSeason', season);
        },
        async fetchSeasons({ commit }) {
            try {
                const access_token = localStorage.getItem('access_token');
                const response = await api.get('/premier-league/v1/seasons', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                commit('setSeasons', response.data.seasons);
            } catch (error) {
                console.log(error);
            }
        }
    }
};

export default season;
