

const selectGameWeek = {
    namespaced: true,
    state: {
        gameWeek: null,
        gameWeekPlayer: null
    },
    getters: {
        getGameWeek(state) {
            return state.gameWeek;
        },
        getGameWeekPlayer(state) {
            return state.gameWeekPlayer;
        }

    },
    mutations: {
        setGameWeek(state, gameWeek) {
            state.gameWeek = gameWeek;
        },
        setGameWeekPlayer(state, gameWeekPlayer) {
            state.gameWeekPlayer = gameWeekPlayer;
        },


    },
    actions: {

        async setGameWeek({ commit }, gameWeek) {
            commit('setGameWeek', gameWeek);
        },
        async setGameWeekPlayer({ commit }, gameWeekPlayer) {
            commit('setGameWeekPlayer', gameWeekPlayer);
        }
    }
};

export default selectGameWeek;
