

const selectGameWeek = {
    namespaced: true,
    state: {
        gameWeek: null,
        gameWeekPlayer: null,
        gameWeekPercentPlayer: null,
        gameWeekPercentPlayerN: null
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
        },
        getGameWeekPercentPlayerN(state) {
            return state.gameWeekPercentPlayerN;
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
        setGameWeekPercentPlayerN(state, gameWeekPercentPlayerN) {
            state.gameWeekPercentPlayerN = gameWeekPercentPlayerN;
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
        },
        async setGameWeekPlayerPercentN({ commit }, gameWeekPercentPlayerN) {
            commit('setGameWeekPercentPlayerN', gameWeekPercentPlayerN);
        }

    }
};

export default selectGameWeek;
