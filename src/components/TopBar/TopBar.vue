<template>
  <div class="topbar">
    <img
      src="https://ik.imagekit.io/fireman35/avatar1_gTDL8Fqsq.jpg?tr=w-240"
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
.topbar {
  height: 10vh;
  display: flex;
  background-color: #000000;
  color: #ffffff;
  padding: 12px;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 12px;
  }

  h1 {
    font-size: 1.25rem;
    line-height: 1.5rem;
    font-weight: 700;
  }

  span {
    font-size: 0.875rem;
    line-height: 1.125rem;
  }

  @media screen and (min-width: 768px) {
    padding: 24px;
  }
}
</style>
