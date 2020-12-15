<template>
  <div class="container">
    <div class="name">
      <p>{{ name }}</p>
    </div>
    <div class="casting-time">
      <label for="casting-time">Casting Time</label>
      <p>{{ castingTime }}</p>
    </div>
    <div class="range">
      <label for="range">Range</label>
      <p>{{ range }}</p>
    </div>
    <div class="components">
      <label for="components">Components</label>
      <p>{{ components.toString() }}</p>
    </div>
    <div class="duration">
      <label for="duration">Duration</label>
      <p>{{ duration }}</p>
    </div>
    <div class="description">
      <p v-for="(desc, index) in description" :key="index">{{ desc }}</p>
    </div>
    <div class="school" :class="schoolIcon"></div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: [
    "name",
    "castingTime",
    "range",
    "components",
    "duration",
    "description",
    "school",
  ],
  setup(props) {
    const schoolIcon = ref(props.school.index);

    return {
      schoolIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
$large-margin: 1rem 0;
$medium-margin: 0.5rem 0;
$small-margin: 0.1rem 0;
$curve: 0.6rem;

@mixin field($area, $margin) {
  grid-area: $area;
  background: white;
  margin: $margin;
}

.container {
  background: rgb(119, 4, 4);
  width: 249px;
  height: 300px;
  color: black;
  box-shadow: 5px 5px 3px #6d553ee5;
  display: grid;
  align-items: center;
  grid-template-columns: 45% 45% !important;
  grid-template-rows: 1fr 1fr 1fr 8fr;
  grid-template-areas:
    "name name"
    "casting range"
    "components duration"
    "desc desc"
    ". school";
  grid-gap: 0 0.2rem !important;

  transition: transform 0.1s !important;

  &:hover {
    transform: scale(1.02);
    box-shadow: 6px 6px 4px #6d553ee5;
  }

  label {
    color: rgb(119, 4, 4);
    font-weight: bold;
    font-size: 0.8rem;
  }

  p {
    margin: 0.1rem;
    font-size: 0.9rem;
  }

  .name {
    @include field(name, $medium-margin);
    border-radius: $curve $curve 0 0;
  }

  .casting-time {
    @include field(casting, $small-margin);
  }

  .range {
    @include field(range, $small-margin);
  }

  .components {
    @include field(components, $small-margin);
  }

  .duration {
    @include field(duration, $small-margin);
  }

  .description {
    @include field(desc, $large-margin);
    border-radius: 0 0 $curve $curve;
    height: 90%;
    overflow: auto;
    margin-bottom: 0.1rem;
  }

  .school {
    @include field(school, $small-margin);
    justify-self: end;
    width: 18px;
    height: 18px;
    background-position: center;
    background-size: cover;
  }

  .abjuration {
    background-image: url("../assets/abjuration.png");
  }
  .conjuration {
    background-image: url("../assets/conjuration.png");
  }
  .divination {
    background-image: url("../assets/divination.png");
  }
  .enchantment {
    background-image: url("../assets/enchantment.png");
  }
  .evocation {
    background-image: url("../assets/evocation.png");
  }
  .illusion {
    background-image: url("../assets/illusion.png");
  }
  .necromancy {
    background-image: url("../assets/necromancy.png");
  }
  .transmutation {
    background-image: url("../assets/transmutation.png");
  }
}
</style>
