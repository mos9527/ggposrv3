import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import channels from "./channels"
import connection from "./connection"
import chat from "./chat"
import challenge from "./challenge"
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    connection, auth,
    channels, chat ,
    challenge   
  }
});