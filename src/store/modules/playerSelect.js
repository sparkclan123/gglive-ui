const playerSelect = {
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

            state.GKP = Array.from({ length: GKP }, () => ({ player_id: null, id: null, name: null }));
            state.DEF = Array.from({ length: DEF }, () => ({ player_id: null, id: null, name: null }));
            state.MID = Array.from({ length: MID }, () => ({ player_id: null, id: null, name: null }));
            state.FWD = Array.from({ length: FWD }, () => ({ player_id: null, id: null, name: null }));
        },
        addPlayer(state, { player, position }) {
            const targetPosition = state[position];
            if (!targetPosition) {
                console.error(`Position ${position} not found in state`);
                return;
            }
           
            const emptySpotIndex = targetPosition.findIndex(p => p.id === null);
            if (emptySpotIndex === -1) return;

            if (targetPosition.some(p => p.id === player.id)) return;

            state[position][emptySpotIndex] = player;
        },
        removePlayer(state, { player, position }) {
            const targetPosition = state[position];
            if (!targetPosition) return;

            const playerIndex = targetPosition.findIndex(p => p.id === player.id);
            if (playerIndex !== -1) {
                targetPosition[playerIndex] = { player_id: null, id: null, name: null };
            }
        }
    },
    actions: {
        setFormation({ commit }, formation) {
            commit('setFormation', formation);
        },
        addPlayer({ commit }, payload) {
            commit('addPlayer', payload);
        },
        removePlayer({ commit }, payload) {
            commit('removePlayer', payload);
        }
    }
};

export default playerSelect;
