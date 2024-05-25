const selectGameWeek = {
    namespaced: true,
    state: {
        GKP: [],
        DEF: [],
        MID: [],
        FWD: [],
    },
    getters: {
        getGKP(state) {
            return state.GKP;
        },
        getDEF(state) {
            return state.DEF;
        },
        getMID(state) {
            return state.MID;
        },
        getFWD(state) {
            return state.FWD;
        },
    },
    mutations: {
        setFormation(state, formation) {
            const [GKP, DEF, MID, FWD] = formation.split('-').map(Number);

            state.GKP = Array.from({ length: GKP }, () => ({ player_id: null, id: null }));
            state.DEF = Array.from({ length: DEF }, () => ({ player_id: null, id: null }));
            state.MID = Array.from({ length: MID }, () => ({ player_id: null, id: null }));
            state.FWD = Array.from({ length: FWD }, () => ({ player_id: null, id: null }));
        },
    },
    actions: {
        setFormation({ commit }, formation) {
            commit('setFormation', formation);
        },
    }
};

export default selectGameWeek;
