

import { createStore } from "vuex";
import auth from "./modules/auth";
import loading from "./modules/loading";
import balance from "./modules/balance";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth: auth,
    loading: loading,
    balance: balance,
  },
});