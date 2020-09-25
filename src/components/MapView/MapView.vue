<template>
  <div class="container">
    <gmap-map
      ref="gmap"
      style="width: 100vw; height: 100%;"
      class="gmap-container"
      :zoom="3"
      :center="{ lat: 0, lng: 0 }"
      :options="mapOptions"
    >
      <gmap-marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
      />
      <gmap-marker
        v-for="{ id, attributes } in markers"
        :key="id"
        ref="markers"
        :icon="userLocationMarker"
        :clickable="true"
        :position="{
          lat: attributes.location_point.latitude,
          lng: attributes.location_point.longitude,
        }"
        @click="onclickMarker('haha')"
        @mouseover="mouseOver('mouseover')"
        @mouseout="mouseLeave('mouseleave')"
      >
        <gmap-info-window
          :opened="infoWindowVisible"
          @closeclick="infoWindowVisible = false"
        >
          <post />
        </gmap-info-window>
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { Post } from './components';
import {
  defaultLatLngBounds,
  viewportLatLngBounds,
  styles,
  restriction,
} from './mapProperty';
import { gmapApi } from 'gmap-vue';

export default {
  name: 'map-view',
  components: {
    post: Post,
  },
  data() {
    return {
      userLocationMarker: {
        url: require('src/assets/images/markers/blue_marker.webp'),
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
  async mounted() {
    const { data } = await this.axios.get('/posts');
    console.log(data);
    this.markers = data;
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
      const placeHolder = require('src/assets/images/markers/ph_blue_marker.webp');
      this.userLocationMarker = {
        url: placeHolder,
      };
    },
    mouseLeave(data) {
      console.log(data);
      this.userLocationMarker = {
        url: require('src/assets/images/markers/blue_marker.webp'),
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
