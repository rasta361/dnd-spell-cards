import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    spellCards: [],
  },
  getters: {
    getSpellCards(state) {
      console.log(state.spellCards);
      return state.spellCards;
    },
  },
  mutations: {
    fetchSpells(state, payload) {
      state.spellCards = payload;
    },
  },
  actions: {
    async fetchSpells(context) {
      console.log("in store");
      const tempUrls = [];
      const tempSpells = [];
      try {
        const urlRes = await axios.get("https://www.dnd5eapi.co/api/spells");
        for (let i = 0; i < 1; i++) {
          tempUrls.push(urlRes.data.results[i].url);
        }
        tempUrls.forEach(async (url) => {
          const detailRes = await axios.get("https://www.dnd5eapi.co" + url);
          tempSpells.push(detailRes.data);
        });
        context.commit("fetchSpells", tempSpells);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
