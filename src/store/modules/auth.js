
import axios from 'axios';

const auth = {
  namespaced: true,
  state: {
    access_token: null,
    userinfo: null,
    loading: false,
  },
  getters: {
    access_token(state) {
      return state.access_token;
    },
    userinfo(state) {
      return state.userinfo;
    },
    loading(state) {
      return state.loading;
    },
  },
  mutations: {
    SET_DATA(state, value) {
      state[value.type] = value.value;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async checkAuth({ commit }, token) {
      try {
        commit("SET_LOADING", true);
        commit("SET_DATA", { type: "access_token", value: token.token });
        commit("SET_LOADING", false);
      } catch (err) {
        console.log("checkAuth_error: ", err);
      }

    },
    async facthUser({ commit }) {
      try {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
          await axios.get('/user-info', {
            headers: { 'Authorization': `Bearer ${access_token}` },
          })
            .then(response => {
              if (response.data.state === true) {
                commit("SET_DATA", { type: "userinfo", value: response.data.data });
              }
            })
            .catch(error => {

            });
        }
      } catch (err) {
        console.log("checkAuth_error: ", err);
      }

    },
  },
};

export default auth;