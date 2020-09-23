<template>
  <div class="container">
    <GmapMap
      ref="gmap"
      style="width: 100vw; height: 100%;"
      :zoom="3"
      :center="{ lat: 0, lng: 0 }"
      :options="{
        zoomControl: false,
        minZoom: 2,
        restriction: {
          latLngBounds: {
            north: 85,
            south: -85,
            west: -180,
            east: 180,
          },
          strictBounds: true,
        },
        styles: mapStyles,
        disableDefaultUI: true,
      }"
    >
      <GmapMarker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
      />
      <GmapMarker
        ref="usernameInput"
        :icon="userLocationMarker"
        :clickable="true"
        :position="{
          lat: 0,
          lng: 0,
        }"
        @click="onclickMarker('haha')"
        @mouseover="mouseOver('mouseover')"
        @mouseout="mouseLeave('mouseleave')"
      />
    </GmapMap>
  </div>
</template>

<script>
// import BlueMarker from './BlueMarker';
// import { TopBar } from 'src/components';

export default {
  name: 'MapView',
  data() {
    return {
      userLocationMarker: {
        url: require('src/assets/images/blue_marker.webp'),
        // size: { width: 40, height: 40, f: 'px', b: 'px' },
        // scaledSize: { width: 35, height: 35, f: 'px', b: 'px' },
      },
      markers: [],
      place: null,
      mapStyles: [
        {
          featureType: 'all',
          elementType: 'geometry',
          stylers: [
            {
              color: '#202c3e',
            },
          ],
        },
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [
            {
              gamma: 0.01,
            },
            {
              lightness: 20,
            },
            {
              weight: '1.39',
            },
            {
              color: '#ffffff',
            },
          ],
        },
        {
          featureType: 'all',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              weight: '0.96',
            },
            {
              saturation: '9',
            },
            {
              visibility: 'on',
            },
            {
              color: '#000000',
            },
          ],
        },
        {
          featureType: 'all',
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            {
              lightness: 30,
            },
            {
              saturation: '9',
            },
            {
              color: '#29446b',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {
              saturation: 20,
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              lightness: 20,
            },
            {
              saturation: -20,
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [
            {
              lightness: 10,
            },
            {
              saturation: -30,
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#193a55',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [
            {
              saturation: 25,
            },
            {
              lightness: 25,
            },
            {
              weight: '0.01',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'all',
          stylers: [
            {
              lightness: -20,
            },
          ],
        },
      ],
    };
  },
  methods: {
    onclickMarker(msg) {
      console.log('Click', msg);
    },
    mouseOver(data) {
      console.log(data);
      const placeHolder = require('src/assets/images/ph_blue_marker.webp');
      // this.userLocationMarker.url = require('src/assets/images/ph_blue_marker.webp');
      // this.$refs.usernameInput.$markerObject.setAnimation(google.maps.Animation.BOUNCE);
      console.log(this.$refs.usernameInput);
    },
    mouseLeave(data) {
      console.log(data);
      this.userLocationMarker.url = require('src/assets/images/blue_marker.webp');
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 90vh;
}
</style>
