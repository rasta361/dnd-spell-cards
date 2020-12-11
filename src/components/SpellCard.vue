<template>
  <div class="container">
    <div class="name"><p>name</p></div>
    <!-- <div class="info-container"> -->
    <div class="casting-time">
      <label for="casting-time">Casting Time</label>
      <p>casting-time</p>
    </div>
    <div class="range">
      <label for="range">Range</label>
      <p>range</p>
    </div>
    <div class="components">
      <label for="components">Components</label>
      <p>components</p>
    </div>
    <div class="duration">
      <label for="duration">Duration</label>
      <p>duration</p>
    </div>
    <!-- </div> -->
    <div class="description">
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
        repellendus alias quaerat corporis labore neque, hic ducimus.
        Exercitationem id aut debitis! Molestias culpa minima esse, aliquid
        corrupti cumque inventore vitae.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const title = "SpellCard works!";

    return {
      title,
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
  width: 200px;
  color: black;
  box-shadow: 5px 5px 3px gray;
  display: grid;
  align-items: center;
  grid-template-columns: 45% 45% !important;
  grid-template-areas:
    "name name"
    "casting range"
    "components duration"
    "desc desc";
  grid-gap: 0 0.2rem !important;

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
  }
}
</style>
