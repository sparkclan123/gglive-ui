

const selectGameWeek = {
    namespaced: true,
    state: {
        gameWeek: null,
        gameWeekPlayer: null,
        gameWeekPercentPlayer: null
    },
    getters: {
        getGameWeek(state) {
            return state.gameWeek;
        },
        getGameWeekPlayer(state) {
            return state.gameWeekPlayer;
        },
        getGameWeekPercentPlayer(state) {
            return state.gameWeekPercentPlayer;
        }

    },
    mutations: {
        setGameWeek(state, gameWeek) {
            state.gameWeek = gameWeek;
        },
        setGameWeekPlayer(state, gameWeekPlayer) {
            state.gameWeekPlayer = gameWeekPlayer;
        },
        setGameWeekPercentPlayer(state, gameWeekPercentPlayer) {
            state.gameWeekPercentPlayer = gameWeekPercentPlayer;
        },


    },
    actions: {

        async setGameWeek({ commit }, gameWeek) {
            commit('setGameWeek', gameWeek);
        },
        async setGameWeekPlayer({ commit }, gameWeekPlayer) {
            commit('setGameWeekPlayer', gameWeekPlayer);
        },
        async setGameWeekPlayerPercent({ commit }, gameWeekPercentPlayer) {
            commit('setGameWeekPercentPlayer', gameWeekPercentPlayer);
        }

    }
};

export default selectGameWeek;
