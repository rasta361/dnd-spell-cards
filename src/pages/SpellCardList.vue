<template>
  <h2>{{ title }}</h2>
  <p v-if="isLoading">Loading...</p>
  <div class="container">
    <spell-card class="spell-card"></spell-card>
    <spell-card class="spell-card"></spell-card>
    <spell-card class="spell-card"></spell-card>
    <spell-card class="spell-card"></spell-card>
    <spell-card class="spell-card"></spell-card>
    <spell-card class="spell-card"></spell-card>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";

import SpellCard from "../components/SpellCard.vue";

export default {
  components: {
    SpellCard,
  },
  setup() {
    const store = useStore();
    const isLoading = ref(false);
    const title = "SpellCardList work!";

    onMounted(async () => {
      console.log("in onMounted");
      isLoading.value = true;
      try {
        console.log("in try");
        await store.dispatch("fetchSpells");
      } catch (err) {
        console.log("in catch");
        console.error(err);
      } finally {
        console.log("in finally");
        isLoading.value = false;
      }
    });

    watch(isLoading, () => {
      if (!isLoading.value) {
        //
      }
    });

    // const spellCards = computed(async () => {
    //   await store.dispatch("fetchSpells");
    //   return await store.getters.getSpellCards;
    // });

    // console.log(spellCards);

    // spellCards.value.then((res) => {
    //   console.log(res);
    //   // console.log(JSON.parse(JSON.stringify(res)));
    // });

    // async function getSpells() {
    //   await store.dispatch("fetchSpells");
    //   const spellCards = await store.getters.getSpellCards;
    //   console.log("in SpellCardList");
    //   console.log(spellCards);
    // }

    // getSpells();

    return {
      title,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  justify-content: center;
  grid-gap: 1rem;

  @media (min-width: 30rem) {
    grid-template-columns: auto auto auto;
  }
}
</style>
