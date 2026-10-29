import { api } from '@axios_inst';

const ticket = {
  namespaced: true,
  state: {
    username: '',
    ticket: localStorage.getItem('ticket') ? JSON.parse(localStorage.getItem('ticket')) : 0,
  },
  getters: {
    getTicket: (state) => state.ticket
  },
  mutations: {
    CLEAR_TICKET(state) { state.ticket = 0; state.username = ''; },
    SET_TICKET(state, ticket) {
      state.ticket = ticket;
      localStorage.setItem('ticket', JSON.stringify(ticket));
    },
  },
  actions: {
    async facthTicket({ commit }) {
      try {
        const access_token = localStorage.getItem('access_token');
        if (!access_token) return;
        const response = await api.get('/premier-league/v1/ticket', {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });
        if (response.data.ok && localStorage.getItem('access_token') === access_token) {
          commit('SET_TICKET', response.data.ticket);
        }
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    }
  }
};

export default ticket;
