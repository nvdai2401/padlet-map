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
        v-for="marker in Object.values(markers)"
        :key="marker.id"
        ref="markers"
        :icon="userLocationMarker"
        :clickable="true"
        :position="{
          lat: marker.location_point.latitude,
          lng: marker.location_point.longitude,
        }"
        @click="onclickMarker(marker.id)"
        @mouseover="mouseOver('mouseover')"
        @mouseout="mouseLeave('mouseleave')"
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
      markers: {},
      place: null,
      mapOptions: null,
      activePost: null,
    };
  },
  computed: {
    google: gmapApi,
  },
  watch: {
    activePost(newPostId, oldPostId) {
      // TODO: Hide old post
      console.log('newPostId, oldPostId', newPostId, oldPostId);
      const postId = newPostId ? newPostId : oldPostId;
      const restriction = {
        ...this.mapOptions.restriction,
        latLngBounds: viewportLatLngBounds,
      };

      if (this.markers[postId].is_post_visible) {
        restriction.latLngBounds = defaultLatLngBounds;
      }
      this.mapOptions = { ...this.mapOptions, restriction };

      if (oldPostId) {
        this.markers[oldPostId].is_post_visible = false;
      }
      if (!newPostId) return;

      this.markers[postId].is_post_visible = !this.markers[postId]
        .is_post_visible;
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
    const { data } = await this.axios.get('/posts');
    const markers = {};
    for (let item of data) {
      markers[item.id] = { ...item.attributes, is_post_visible: false };
    }
    this.markers = markers;
  },
  methods: {
    hideAllMarkers() {
      for (let id of Object.keys(this.markers)) {
        this.markers[id].is_post_visible = false;
      }
    },
    onclickMarker(postId) {
      console.log(this.activePost, postId);
      if (this.activePost === postId) {
        this.activePost = null;
        return;
      }
      this.activePost = postId;
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
