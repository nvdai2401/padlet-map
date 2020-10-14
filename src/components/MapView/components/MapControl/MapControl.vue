<template>
  <div
    class="flex-column map-control"
  >
    <button
      class="button fit-bounds"
      @click="togglePreview"
    >
      <font-awesome-icon :icon="['fas', 'bars']" />
    </button>

    <div class="flex-column group-button">
      <button class="button" @click="fitBounds">
        <font-awesome-icon :icon="['fas', 'expand']" />
      </button>
      <button class="button" @click="zoomIn">
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
      <button class="button" @click="zoomOut">
        <font-awesome-icon :icon="['fas', 'minus']" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-control',
  props: {
    togglePreview: Function,
    fitBounds: Function,
    zoomIn: Function,
    zoomOut: Function,
  }
}
</script>
