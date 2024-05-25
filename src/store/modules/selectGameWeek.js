

const selectGameWeek = {
    namespaced: true,
    state: {
        gameWeek: null
    },
    getters: {
        getGameWeek(state) {
            return state.seasons;
        }
    },
    mutations: {
        setGameWeek(state, gameWeek) {
            state.gameWeek = gameWeek;
        },

    },
    actions: {
        addSeason({ commit }, season) {
            commit('addSeason', season);
        },
        async setGameWeek({ commit }, gameWeek) {
            commit('setGameWeek', gameWeek);
        }
    }
};

export default selectGameWeek;
