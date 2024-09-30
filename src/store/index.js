

import { createStore } from "vuex";
import auth from "./modules/auth";
import loading from "./modules/loading";
import balance from "./modules/balance";
import alert from './modules/alert';
import season from './modules/season';
import GameWeek from './modules/GameWeek';
import Teams from './modules/teams';
import playerSelect from './modules/playerSelect';
import ticket from './modules/ticket';
import playerSelectBigmatch from './modules/playerSelectBigmatch';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth: auth,
    loading: loading,
    balance: balance,
    alert: alert,
    season: season,
    GameWeek: GameWeek,
    Teams: Teams,
    playerSelect: playerSelect,
    ticket: ticket,
    playerSelectBigmatch:playerSelectBigmatch
  },
});