
const loading = {
  namespaced: true,
  state: {
    loading: true,
  },
  getters: {
    getLoading: (state) => state.loading
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading
    },
  },
  actions: {
    updateLoading({ commit }, loading) {
      commit('SET_LOADING', loading)
    }
  }

};

export default loading;