import { createStore } from "vuex";

export default createStore({
  state: {
    id: "",
  },
  getters: {},
  mutations: {
    idDetails(state, ide) {
      state.id = ide;
    },
  },
  actions: {
    envoieId: ({ commit }, idDetails) => {
      commit("idDetails", idDetails);
    },
  },
  modules: {},
});
