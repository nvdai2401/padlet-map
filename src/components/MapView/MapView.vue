<template>
  <div class="map-view">
    <gmap-map
      ref="gmap"
      class="gmap-container"
      :zoom="initialZoom"
      :center="center"
      :options="mapOptions"
      @click="handleOnClickMap"
    >
      <gmap-marker
        ref="markers"
        v-for="marker in Object.values(markers)"
        :key="marker.id"
        :icon="{
          url: require(`@/assets/images/markers/${marker.color}_marker.webp`),
        }"
        :clickable="true"
        :position="{
          lat: marker.location_point.latitude,
          lng: marker.location_point.longitude,
        }"
        @click="handleOnClick(marker.id)"
        @mouseover="handleOnMouseOver(marker.id)"
        @mouseout="handleOnMouseOut(marker.id)"
      >
        <gmap-info-window
          :opened="marker.is_post_visible"
          @closeclick="is_post_visible = false"
        >
          <post-popup
            v-if="marker.is_post_visible"
            :post="marker"
            :onExpandPost="handleOnExpandPost"
          />
        </gmap-info-window>
      </gmap-marker>
    </gmap-map>

    <div
      v-show="mapControlVisible"
      :class="[
        'flex-column map-control',
        postPreviewVisible ? 'preview-shown' : '',
      ]"
    >
      <button
        class="button map-center-control"
        @click="postPreviewVisible = !postPreviewVisible"
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
    <transition-group tag="div" name="slide">
      <post-preview
        v-show="postPreviewVisible && Object.keys(markers).length > 0"
        key="post-preview"
        :posts="Object.values(markers)"
        :onMouseOverPost="handleOnMouseOver"
        :onMouseOutPost="handleOnMouseOut"
        :onClickPost="handleOnClick"
      />
    </transition-group>

    <post-expanded
      v-if="postExpandedVisible"
      :open="postExpandedVisible"
      :postId="activePost"
      :posts="Object.keys(markers)"
      :onClose="handleOnClosePostExpanded"
    />
  </div>
</template>

<script>
import { PostPopup, PostPreview, PostExpanded } from './components';
import {
  defaultLatLngBounds,
  viewportLatLngBounds,
  options,
  DEFAULT_CENTER,
  MIN_ZOOM,
  MAX_ZOOM,
} from './mapProperty';
import { getMarkers } from '@/api';

export default {
  name: 'map-view',
  components: {
    'post-popup': PostPopup,
    'post-preview': PostPreview,
    'post-expanded': PostExpanded,
  },
  data() {
    return {
      initialZoom: MIN_ZOOM,
      center: DEFAULT_CENTER,
      infoWindowVisible: false,
      postPreviewVisible: false,
      postExpandedVisible: false,
      mapControlVisible: false,
      markers: {},
      mapOptions: null,
      activePost: null,
      activeMarkerColor: '',
      focusedPost: '',
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
    this.mapOptions = options;
  },
  async mounted() {
    await this.fetchMakers();
    await this.$gmapApiPromiseLazy();
    this.fitBounds();
    this.mapControlVisible = true;
  },
  methods: {
    async fetchMakers() {
      const data = await getMarkers();
      const markers = {};

      for (let item of data) {
        markers[item.id] = { ...item.attributes, is_post_visible: false };
      }
      this.markers = markers;
    },
    handleOnClick(postId) {
      if (this.activePost === postId) {
        this.activePost = null;
        return;
      }
      this.activePost = postId;
    },
    handleOnMouseOver(postId) {
      if (postId !== this.focusedPost) {
        const PLACEHOLDER_PREFIX = 'ph_';
        this.focusedPost = postId;
        this.activeMarkerColor = this.markers[postId].color;
        this.markers[postId].color =
          PLACEHOLDER_PREFIX + this.markers[postId].color;
      }
    },
    handleOnMouseOut(postId) {
      this.markers[postId].color = this.activeMarkerColor;
      this.activeMarkerColor = '';
      this.focusedPost = '';
    },
    handleOnClickMap() {
      this.activePost = null;
    },
    fitBounds() {
      this.$refs.gmap.$mapPromise.then((map) => {
        // eslint-disable-next-line no-undef
        var bounds = new google.maps.LatLngBounds();
        Object.values(this.markers)
          .reverse()
          .forEach((marker) => {
            bounds.extend(
              // eslint-disable-next-line no-undef
              new google.maps.LatLng(
                marker.location_point.latitude,
                marker.location_point.longitude,
              ),
            );
          });
        map.fitBounds(bounds);
      });
    },
    handleOnExpandPost() {
      this.postExpandedVisible = true;
    },
    handleOnClosePostExpanded() {
      this.postExpandedVisible = false;
      this.activePost = null;
    },
    zoomIn() {
      const currentZoom = this.$refs.gmap.$mapObject.zoom;

      if (currentZoom < MAX_ZOOM) {
        this.mapOptions = { ...this.mapOptions, zoom: currentZoom + 1 };
      }
    },
    zoomOut() {
      const currentZoom = this.$refs.gmap.$mapObject.zoom;

      if (currentZoom > MIN_ZOOM) {
        this.mapOptions = { ...this.mapOptions, zoom: currentZoom - 1 };
      }
    },
  },
};
</script>
