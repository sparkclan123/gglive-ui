
import axios from 'axios';

const user = {
  namespaced: true,
  state: {
    username: null,
    balance: 0.00,
  },
  getters: {
    getBalance(state) {
      return state.balance;
    },
    getUsername(state) {
      return state.username;
    },

  },
  mutations: {
    SET_DATA(state, value) {
      state[value.type] = value.value;
    },
  },
  actions: {

    async facthBalance({ commit }) {
      try {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
          await axios.get('/user/m/user-balance', {
            headers: { 'Authorization': `Bearer ${access_token}` },
          })
            .then(response => {
              if (response.data.status === 'ok') {
                commit("SET_DATA", { type: "balance", value: response.data.data.balance });
                commit("SET_DATA", { type: "username", value: response.data.data.username });
              }
            })
            .catch(error => {

            });
        }
      } catch (err) {
        console.log("user-balance-error: ", err);
      }

    },
  },
};

export default user;