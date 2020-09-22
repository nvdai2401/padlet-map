<template>
  <div>
    MapView
    <GmapMap
      style="width: 600px; height: 300px;"
      :zoom="1"
      :center="{ lat: 0, lng: 0 }"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUI: false,
      }"
    >
      <GmapMarker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
      />
      <GmapMarker
        v-if="this.place"
        label="★"
        :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'MapView',
  data() {
    return {
      markers: [],
      place: null,
    };
  },
};
</script>
