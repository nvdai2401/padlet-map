<template>
  <div class="c-top-bar">
    <img
      src="https://ik.imagekit.io/fireman35/avatar1_gTDL8Fqsq.jpg?tr=w-240,h-240"
      alt="Michael from Vietnam"
      class="c-top-bar__avatar m-r-12"
    />
    <div>
      <h4>Map of Countries I'd like to visit</h4>
      <span>Everywhere I'd like to visit in the world.</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class TopBar extends Vue {}
</script>
