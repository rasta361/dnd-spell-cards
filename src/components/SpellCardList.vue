<template>
  <p v-if="isLoading">Loading...</p>
  <div class="container" v-else>
    <spell-card
      class="spell-card"
      v-for="(spell, index) in displayedSpells"
      :key="index"
      :name="spell.name"
      :castingTime="spell.casting_time"
      :range="spell.range"
      :components="spell.components"
      :duration="spell.duration"
      :description="spell.desc"
    ></spell-card>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

import SpellCard from "./SpellCard.vue";

export default {
  components: {
    SpellCard,
  },
  setup() {
    const isLoading = ref(false);
    const spells = ref([]);
    const tempUrls = [];

    onMounted(async () => {
      isLoading.value = true;
      onResize();
      try {
        const urlRes = await axios.get("https://www.dnd5eapi.co/api/spells");
        for (let i = 0; i < urlRes.data.results.length; i++) {
          tempUrls.push(urlRes.data.results[i].url);
        }
        tempUrls.forEach(async (url) => {
          const detailRes = await axios.get("https://www.dnd5eapi.co" + url);
          spells.value.push(detailRes.data);
        });
      } catch (error) {
        console.error(error);
      } finally {
        console.log("in finally");
        isLoading.value = false;
      }
    });

    let amount = ref(4);

    let displayedSpells = computed(() => {
      return spells.value.slice(0, amount.value);
    });

    window.addEventListener("resize", onResize);

    function onResize() {
      if (window.innerWidth > 16 * 30 && window.innerWidth < 16 * 45) {
        amount.value = 4;
      }
      if (window.innerWidth > 16 * 45 && window.innerWidth < 16 * 60) {
        amount.value = 6;
      }
      if (window.innerWidth > 16 * 60 && window.innerWidth < 16 * 75) {
        amount.value = 8;
      }
      if (window.innerWidth > 16 * 75) {
        amount.value = 10;
      }
    }

    return {
      isLoading,
      spells,
      displayedSpells,
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
    grid-template-columns: auto auto;
  }
  @media (min-width: 45rem) {
    grid-template-columns: auto auto auto;
  }
  @media (min-width: 60rem) {
    grid-template-columns: auto auto auto auto;
  }
  @media (min-width: 75rem) {
    grid-template-columns: auto auto auto auto auto;
  }
}
</style>
