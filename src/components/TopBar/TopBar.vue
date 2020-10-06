<template>
  <div class="flex-row topbar">
    <img
      src="https://ik.imagekit.io/fireman35/avatar1_gTDL8Fqsq.jpg?tr=w-240,h-240"
      alt="Michael from Vietnam"
    />
    <div>
      <h1>Map of Countries I'd like to visit</h1>
      <span>Everywhere I'd like to visit in the world.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top-bar',
};
</script>

<style lang="scss" scoped>
@import 'src/assets/styles/variables.scss';

.topbar {
  height: $topbar-height;
  background-color: $black;
  color: $white;
  padding: 12px;

  img {
    border-radius: 50%;
    margin-right: 12px;
    @include size($width: 50px, $height: 50px);
  }

  h1 {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 700;
  }

  span {
    font-size: 0.8rem;
    line-height: 1.125rem;
  }

  @media screen and (min-width: 768px) {
    padding-left: 24px;

    h1 {
      font-size: 1.25rem;
    }

    span {
      font-size: 0.875rem;
    }
  }
}
</style>
