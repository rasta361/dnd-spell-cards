<template>
  <h1>D&D Spell Cards</h1>
  <div class="search">
    <label for="search">Search: </label>
    <input type="text" v-model.trim="search" />
  </div>
  <h2 v-if="isLoading">Loading...</h2>
  <div
    class="container"
    :class="{ left: isAnimatedLeft, right: isAnimatedRight }"
    v-else
  >
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
      :school="spell.school"
    ></spell-card>
  </div>
  <div class="page">
    <button @click="changePage('prev')">&lt;</button>
    <label for="page">
      Page {{ page + 1 }} / {{ Math.ceil(arrLength / pageSize) }}&nbsp;</label
    >
    <button @click="changePage('next')">></button>
  </div>
  <div class="pageSize">
    <label for="pageSize">Page Size </label>
    <select name="pageSize" id="pageSize" v-model="sizeMulti">
      <option value="1">{{ 1 * amount }}</option>
      <option value="2">{{ 2 * amount }}</option>
      <option value="3">{{ 3 * amount }}</option>
      <option value="4">{{ 4 * amount }}</option>
      <option value="5">{{ 5 * amount }}</option>
    </select>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";

import SpellCard from "./SpellCard.vue";

export default {
  components: {
    SpellCard,
  },
  setup() {
    const isLoading = ref(false);
    const spells = ref([]);
    const filteredSpells = ref([spells.value]);
    const tempUrls = [];
    const page = ref(0);
    const amount = ref(4);
    const sizeMulti = ref(1);
    const pageSize = computed(() => {
      return amount.value * sizeMulti.value;
    });
    const search = ref("");

    const arrLength = computed(() => {
      if (search.value === "") {
        return spells.value.length;
      } else {
        return filteredSpells.value.length;
      }
    });

    watch(pageSize, () => {
      if (page.value > Math.ceil(arrLength.value / pageSize.value)) {
        page.value = Math.ceil(arrLength.value / pageSize.value) - 1;
      }
    });

    watch(search, () => {
      page.value = 0;
    });

    const displayedSpells = computed(() => {
      if (search.value !== "") {
        filteredSpells.value = spells.value.filter((spell) => {
          return spell.name.toLowerCase().includes(search.value.toLowerCase());
        });

        return filteredSpells.value.slice(
          page.value * pageSize.value,
          pageSize.value * (page.value + 1)
        );
      }

      return spells.value.slice(
        page.value * pageSize.value,
        pageSize.value * (page.value + 1)
      );
    });

    function changePage(direction) {
      if (
        direction === "next" &&
        page.value + 1 < arrLength.value / pageSize.value
      ) {
        animateCards("left");
        page.value++;
      } else if (direction === "prev" && page.value > 0) {
        page.value--;
        animateCards("right");
      }
    }

    window.addEventListener("resize", onResize);

    function onResize() {
      if (window.innerWidth > 16 * 33 && window.innerWidth < 16 * 49.5) {
        amount.value = 4;
      }
      if (window.innerWidth > 16 * 49.5 && window.innerWidth < 16 * 66) {
        amount.value = 6;
      }
      if (window.innerWidth > 16 * 66 && window.innerWidth < 16 * 82.5) {
        amount.value = 8;
      }
      if (window.innerWidth > 16 * 82.5) {
        amount.value = 10;
      }
      if (page.value > Math.ceil(arrLength.value / pageSize.value)) {
        page.value = Math.ceil(arrLength.value / pageSize.value) - 1;
      }
    }

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
        isLoading.value = false;
      }
    });

    const isAnimatedLeft = ref(false);
    const isAnimatedRight = ref(false);
    function animateCards(direction) {
      if (direction === "left") isAnimatedLeft.value = true;
      else isAnimatedRight.value = true;

      clearTimeout(timer);
      const timer = setTimeout(() => {
        isAnimatedLeft.value = false;
        isAnimatedRight.value = false;
      }, 250);
    }

    return {
      isLoading,
      spells,
      displayedSpells,
      amount,
      page,
      pageSize,
      sizeMulti,
      changePage,
      search,
      arrLength,
      isAnimatedLeft,
      isAnimatedRight,
      animateCards,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  justify-content: center;
  grid-gap: 1rem;

  @media (min-width: 33rem) {
    grid-template-columns: auto auto;
  }
  @media (min-width: 49.5rem) {
    grid-template-columns: auto auto auto;
  }
  @media (min-width: 66rem) {
    grid-template-columns: auto auto auto auto;
  }
  @media (min-width: 82.5rem) {
    grid-template-columns: auto auto auto auto auto;
  }
}

.search,
.page,
.pageSize {
  display: inline-block;
  margin: 0.9rem;
}

.left {
  animation: slide-cards-left 0.5s ease-out forwards;
}

.right {
  animation: slide-cards-right 0.5s ease-out forwards;
}

@keyframes slide-cards-left {
  0% {
    transform: translateX(0);
  }

  30% {
    transform: translateX(-150%);
  }

  31% {
    transform: translateY(150%);
  }

  32% {
    transform: translateX(150%);
  }

  50% {
    transform: translateY(0);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes slide-cards-right {
  0% {
    transform: translateX(0);
  }

  30% {
    transform: translateX(150%);
  }

  31% {
    transform: translateY(-150%);
  }

  32% {
    transform: translateX(-150%);
  }

  50% {
    transform: translateY(0);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
