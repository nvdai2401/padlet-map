<template>
  <div class="container">
    <GmapMap
      ref="gmap"
      style="width: 100vw; height: 100%;"
      class="gmap-container"
      :zoom="3"
      :center="{ lat: 0, lng: 0 }"
      :options="{
        backgroundColor: '#192331',
        zoomControl: false,
        minZoom: 2,
        restriction: restriction,
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
// import BlueMarker from './BlueMarker';
import { gmapApi } from 'gmap-vue';
export default {
  name: 'MapView',
  data() {
    return {
      userLocationMarker: {
        url: require('src/assets/images/blue_marker.webp'),
        // size: { width: 40, height: 40, f: 'px', b: 'px' },
        // scaledSize: { width: 35, height: 35, f: 'px', b: 'px' },
      },
      infoWindowVisible: false,
      markers: [],
      place: null,
      restriction: {
        latLngBounds: {
          north: 85,
          south: -85,
          west: -180,
          east: 180,
        },
        strictBounds: true,
      },
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
  computed: {
    google: gmapApi,
  },
  methods: {
    onclickMarker(msg) {
      console.log('Click', msg);
      this.infoWindowVisible = true;

      const placeHolder = require('src/assets/images/red_marker.webp');
      this.userLocationMarker.url = placeHolder;
      // this.$refs.usernameInput.$markerObject.setAnimation(google.maps.Animation.BOUNCE);
      this.$refs.marker.$markerObject.icon.url = placeHolder;
      console.log('google', this.$refs.marker.$markerObject);
    },
    mouseOver(data) {
      console.log(data);
      const placeHolder = require('src/assets/images/ph_blue_marker.webp');
      this.userLocationMarker = {
        url: require('src/assets/images/ph_blue_marker.webp'),
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

.gmap-container {
  // background-color: red;
}
</style>
