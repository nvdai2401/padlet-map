<template>
  <div class="c-map-control">
    <button
      class="o-button control-button c-map-control__fit-bounds m-6"
      @click="togglePreview"
    >
      <font-awesome-icon :icon="['fas', 'bars']" />
    </button>

    <div class="c-map-control__group-button  m-6">
      <button class="o-button control-button" @click="fitBounds">
        <font-awesome-icon :icon="['fas', 'expand']" />
      </button>
      <button class="o-button control-button" @click="zoomIn">
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
      <button class="o-button control-button" @click="zoomOut">
        <font-awesome-icon :icon="['fas', 'minus']" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    togglePreview: Function,
    fitBounds: Function,
    zoomIn: Function,
    zoomOut: Function,
  },
})
export default class MapControl extends Vue {}
</script>
