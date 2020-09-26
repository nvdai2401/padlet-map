<template>
  <div class="container">
    <gmap-map
      ref="gmap"
      class="gmap-container"
      :zoom="3"
      :center="{ lat: 0, lng: 0 }"
      :options="mapOptions"
    >
      <gmap-marker
        v-for="marker in Object.values(markers)"
        :key="marker.id"
        ref="markers"
        :icon="{
          url: require(`src/assets/images/markers/${marker.color}_marker.webp`),
        }"
        :clickable="true"
        :position="{
          lat: marker.location_point.latitude,
          lng: marker.location_point.longitude,
        }"
        @click="onclickMarker(marker.id)"
        @mouseover="mouseOver(marker.id)"
        @mouseout="mouseLeave(marker.id)"
      >
        <gmap-info-window
          :opened="marker.is_post_visible"
          @closeclick="is_post_visible = false"
        >
          <post :post-info="marker" />
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
import { getMarkers } from 'src/api';

const PLACEHOLDER_PREFIX = 'ph_';

export default {
  name: 'map-view',
  components: {
    post: Post,
  },
  data() {
    return {
      infoWindowVisible: false,
      markers: {},
      place: null,
      mapOptions: null,
      activePost: null,
      activeMarkerColor: '',
    };
  },
  watch: {
    activePost(newPostId, oldPostId) {
      const restriction = {
        ...this.mapOptions.restriction,
        latLngBounds: viewportLatLngBounds,
      };
      // Hide old post
      if (oldPostId) {
        this.markers[oldPostId].is_post_visible = false;
      }
      // Hide current post and update map bounds to fit the viewport when click its marker
      if (!newPostId) {
        this.mapOptions = { ...this.mapOptions, restriction };
        return;
      }
      // Show post and change map bounds to default when click a marker
      this.markers[newPostId].is_post_visible = true;
      restriction.latLngBounds = defaultLatLngBounds;
      this.mapOptions = { ...this.mapOptions, restriction };
    },
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
    const data = await getMarkers();
    const markers = {};
    
    for (let item of data) {
      markers[item.id] = { ...item.attributes, is_post_visible: false };
    }
    this.markers = markers;
  },
  methods: {
    onclickMarker(postId) {
      if (this.activePost === postId) {
        this.activePost = null;
        return;
      }
      this.activePost = postId;
    },
    mouseOver(postId) {
      this.activeMarkerColor = this.markers[postId].color;
      this.markers[postId].color =
        PLACEHOLDER_PREFIX + this.markers[postId].color;
    },
    mouseLeave(postId) {
      this.markers[postId].color = this.activeMarkerColor;
      this.activeMarkerColor = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 90vh;
}

.gmap-container {
  width: 100vw;
  height: 100%;
}
</style>
