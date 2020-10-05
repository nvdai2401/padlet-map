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
          url: require(`src/assets/images/markers/${marker.color}_marker.webp`),
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
          <post
            v-if="marker.is_post_visible"
            :post-info="marker"
            :onExpandPost="handleOnExpandPost"
          />
        </gmap-info-window>
      </gmap-marker>
    </gmap-map>

    <div :class="['map-control', postPreviewVisible ? 'preview-shown' : '']">
      <button
        class="button map-center-control"
        @click="postPreviewVisible = !postPreviewVisible"
      >
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>

      <div class="group-button">
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
        :posts="markers"
        :onClick="handleOnClick"
        :onMouseOver="handleOnMouseOver"
        :onMouseOut="handleOnMouseOut"
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
import { Post, PostPreview, PostExpanded } from "./components";
import {
  defaultLatLngBounds,
  viewportLatLngBounds,
  options,
  DEFAULT_CENTER,
  MIN_ZOOM,
  MAX_ZOOM,
} from "./mapProperty";
import { getMarkers } from "src/api";

export default {
  name: "map-view",
  components: {
    post: Post,
    "post-preview": PostPreview,
    "post-expanded": PostExpanded,
  },
  data() {
    return {
      initialZoom: MIN_ZOOM,
      center: DEFAULT_CENTER,
      infoWindowVisible: false,
      postPreviewVisible: false,
      postExpandedVisible: false,
      markers: {},
      mapOptions: null,
      activePost: null,
      activeMarkerColor: "",
      focusedPost: "",
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
    this.fitBounds();
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
        const PLACEHOLDER_PREFIX = "ph_";
        this.focusedPost = postId;
        this.activeMarkerColor = this.markers[postId].color;
        this.markers[postId].color =
          PLACEHOLDER_PREFIX + this.markers[postId].color;
      }
    },
    handleOnMouseOut(postId) {
      this.markers[postId].color = this.activeMarkerColor;
      this.activeMarkerColor = "";
      this.focusedPost = "";
    },
    handleOnClickMap() {
      this.activePost = null;
    },
    fitBounds() {
      this.$refs.gmap.$mapPromise.then((map) => {
        var bounds = new google.maps.LatLngBounds();
        Object.values(this.markers)
          .reverse()
          .forEach((marker) => {
            bounds.extend(
              new google.maps.LatLng(
                marker.location_point.latitude,
                marker.location_point.longitude
              )
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

<style lang="scss" scoped>
.map-view {
  height: 90vh;
  position: relative;

  .gmap-container {
    width: 100vw;
    height: 100%;
  }

  .preview-shown {
    transform: translateY(-74px);
  }

  .map-control {
    position: absolute;
    z-index: 3000;
    bottom: 48px;
    left: 12px;
    display: flex;
    flex-direction: column;

    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

    svg {
      height: 14px;
    }

    .button {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666666;
      background-color: #ffffff;
      transition: all 0.15s ease-out;
      cursor: pointer;
      border: 0;
      outline: unset;

      &:hover {
        svg {
          color: #000000;
        }
      }
    }

    .map-center-control {
      border-radius: 6px;
    }

    .group-button {
      margin-top: 6px;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12);
      transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  .slide-leave-active,
  .slide-enter-active {
    transition: 0.3s;
  }
  .slide-enter {
    transform: translate(0, 100%);
  }
  .slide-leave-to {
    transform: translate(0, 100%);
  }

  @media screen and (min-width: 768px) {
    .preview-shown {
      transform: unset;
    }

    .map-control {
      flex-direction: row;
      bottom: 26px;
      right: 12px;
      left: unset;

      svg {
        height: 14px;
      }

      .group-button {
        display: flex;
        margin-top: 0;
        margin-left: 12px;
      }
    }

    .slide-enter {
      transform: translate(100%, 0);
    }
    .slide-leave-to {
      transform: translate(100%, 0);
    }
  }
}
</style>
