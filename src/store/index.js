

import { createStore } from "vuex";
import auth from "./modules/auth";
import loading from "./modules/loading";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth: auth,
    loading: loading
  },
});