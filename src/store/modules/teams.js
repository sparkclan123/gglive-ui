

const teams = {
    namespaced: true,
    state: {
        Teams: null
    },
    getters: {

        getTeams(state) {
            return state.Teams;
        }

    },
    mutations: {

        setTeams(state, Teams) {
            state.Teams = Teams;
        },


    },
    actions: {
        async setTeams({ commit }, Teams) {
            commit('setTeams', Teams);
        }
    }
};

export default teams;
