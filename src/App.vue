<template>
  <spell-card-list></spell-card-list>
</template>

<script>
import SpellCardList from "./components/SpellCardList.vue";

export default {
  name: "App",
  components: {
    SpellCardList,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  background: #e2ad78c4;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
