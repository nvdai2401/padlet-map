<template>
  <div class="container">
    <GmapMap
      ref="gmap"
      style="width: 100vw; height: 100%;"
      class="gmap-container"
      :zoom="3"
      :center="{ lat: 0, lng: 0 }"
      :options="mapOptions"
    >
      <GmapMarker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
      />
      <GmapMarker
        ref="marker"
        :icon="userLocationMarker"
        :clickable="true"
        :position="{
          lat: 0,
          lng: 0,
        }"
        @click="onclickMarker('haha')"
        @mouseover="mouseOver('mouseover')"
        @mouseout="mouseLeave('mouseleave')"
      >
        <gmap-info-window
          :opened="infoWindowVisible"
          @closeclick="infoWindowVisible = false"
        >
          hello
        </gmap-info-window>
      </GmapMarker>
    </GmapMap>
  </div>
</template>

<script>
import {
  defaultLatLngBounds,
  viewportLatLngBounds,
  styles,
  restriction,
} from './mapProperty';
import { gmapApi } from 'gmap-vue';

export default {
  name: 'MapView',
  data() {
    return {
      userLocationMarker: {
        url: require('src/assets/images/blue_marker.webp'),
      },
      infoWindowVisible: false,
      markers: [],
      place: null,
      mapOptions: null,
    };
  },
  computed: {
    google: gmapApi,
  },
  created() {
    this.mapOptions = {
      backgroundColor: '#192331',
      zoomControl: false,
      minZoom: 2,
      restriction: restriction,
      styles: styles,
      disableDefaultUI: true,
    };
  },
  methods: {
    onclickMarker(msg) {
      let restriction = {
        ...this.mapOptions.restriction,
        latLngBounds: viewportLatLngBounds,
      };
      this.infoWindowVisible = !this.infoWindowVisible;
      if (this.infoWindowVisible) {
        restriction = {
          ...this.mapOptions.restriction,
          latLngBounds: defaultLatLngBounds,
        };
      }

      this.mapOptions = { ...this.mapOptions, restriction };
    },
    mouseOver(data) {
      console.log(data);
      const placeHolder = require('src/assets/images/ph_blue_marker.webp');
      this.userLocationMarker = {
        url: placeHolder,
      };
    },
    mouseLeave(data) {
      console.log(data);
      this.userLocationMarker = {
        url: require('src/assets/images/blue_marker.webp'),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 90vh;
}
</style>
