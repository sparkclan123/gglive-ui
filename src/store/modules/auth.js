
import { api, apiMine } from '@axios_inst';

const auth = {
  namespaced: true,
  state: {
    access_token: null,
    userinfo: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null,
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
     
      localStorage.setItem('userinfo', JSON.stringify(state.userinfo));
    },
    CLEAR_SESSION(state) {
      state.access_token = null;
      state.userinfo = null;
      state.loading = false;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },
  actions: {

    async facthUserInfo({ commit }) {
      try {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
          await api.get('/premier-league/v1/user-info', {
            headers: { 'Authorization': `Bearer ${access_token}` },
          })
            .then(response => {
              if (response.data.ok === true && localStorage.getItem('access_token') === access_token) {
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