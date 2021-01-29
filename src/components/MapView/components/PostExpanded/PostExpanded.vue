<template>
  <div class="c-post-expanded">
    <div class="c-post-expanded__toolbar">
      <div class="post-index">{{ currentIndex + 1 }}/{{ posts.length }}</div>
      <div class="nav-buttons">
        <button @click="moveToFirstPost" :disabled="currentIndex === 0">
          <font-awesome-icon :icon="['fas', 'step-backward']" />
        </button>
        <button @click="moveToPrevPost" :disabled="currentIndex === 0">
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </button>
        <button
          @click="moveToNextPost"
          :disabled="currentIndex === posts.length - 1"
        >
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>
        <button
          @click="moveToLastPost"
          :disabled="currentIndex === posts.length - 1"
        >
          <font-awesome-icon :icon="['fas', 'step-forward']" />
        </button>
      </div>
      <div>
        <button @click="onClose">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>
    </div>

    <div class="c-post-expanded__body">
      <spinner v-if="loading" />

      <post-content
        v-else
        :src="postInfo.attachment + `?tr=w-${imgWidth}`"
        :srcSet="srcSet"
        sizes="(min-width: 768px) 720px, 100vw"
        :alt="postInfo.headline"
        :width="imgWidth"
        :height="placeholder.height"
        :styles="{ backgroundColor: placeholder.bgColor }"
        :header="postInfo.headline"
        :body="postInfo.body"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { getPostInfo } from "@/api";
import {
  POST_EXPANDED_WIDTH,
  calculatePlaceholderHeight,
  generateSrcSet,
} from "@/shares/utils";
import PostContent from "../PostContent";
import { Spinner } from "./components";
import { Attributes } from "@fortawesome/fontawesome-svg-core";
// import { keydown } from "./mixins";

type Placeholder = {
  bgColor: string;
  height: number;
};

type Color = {
  color: [number, number, number];
  weight: number;
};

type PreviewImage = {
  url: string;
  colors: [Color];
  dominant_color: [number, number, number];
  width: number;
  height: number;
};

type PostInfo = {
  preview_image: PreviewImage;
  attachment: string;
};

// type Attributes = {
//   id: string;
// }

// type Post = {
//   id: string;
//   attributes: Attributes
// }

const PostExpandedProps = Vue.extend({
  props: {
    postId: Number,
    posts: Array,
    onClose: Function,
  },
  components: {
    spinner: Spinner,
    "post-content": PostContent,
  },
  // mixins: [keydown],
});

@Component
export default class PostExpanded extends mixins(Vue, PostExpandedProps) {
  postInfo: PostInfo = {
    preview_image: {
      url: "",
      colors: [{ color: [0, 0, 0], weight: 0 }],
      dominant_color: [0, 0, 0],
      width: 0,
      height: 0,
    },
    attachment: "",
  };
  currentIndex = -1;
  placeholder: Placeholder = { bgColor: "", height: 0 };
  srcSet = "";
  loading = true;
  imgWidth = POST_EXPANDED_WIDTH;

  async fetchPost(): Promise<void> {
    const postData = await getPostInfo(this.posts[this.currentIndex]);
    this.postInfo = postData.attributes;
  }

  calculateImageWidth(): void {
    const screenWidth = window.innerWidth;
    const DESKTOP_MIN_WIDTH = 768;

    if (screenWidth < DESKTOP_MIN_WIDTH) {
      this.imgWidth = window.innerWidth;
    }
  }

  updatePlaceholder(): void {
    const placeholder = this.postInfo.preview_image;
    const height = calculatePlaceholderHeight(
      placeholder.width,
      placeholder.height,
      this.imgWidth
    );

    this.placeholder = {
      bgColor: `rgb(${placeholder.dominant_color.join(",")})`,
      height,
    };
  }

  moveToNextPost(): void {
    this.currentIndex += 1;
  }
  moveToPrevPost(): void {
    this.currentIndex -= 1;
  }

  moveToFirstPost(): void {
    this.currentIndex = 0;
  }

  moveToLastPost(): void {
    this.currentIndex = this.posts.length - 1;
  }

  handleOnKeyDown(e: KeyboardEvent): void {
    const ARROW_LEFT_KEYCODE = 37,
      ARROW_RIGHT_KEYCODE = 39,
      ESCAPE_KEYCODE = 27;

    switch (e.keyCode) {
      case ARROW_LEFT_KEYCODE:
        if (this.currentIndex > 0) {
          this.moveToPrevPost();
        }
        break;
      case ARROW_RIGHT_KEYCODE:
        if (this.currentIndex < this.posts.length - 1) {
          this.moveToNextPost();
        }
        break;
      case ESCAPE_KEYCODE:
        this.onClose();
        break;
      default:
        return;
    }
  }

  @Watch("currentIndex")
  async onCurrentIndexChanged(newValue: number): Promise<void> {
    this.currentIndex = newValue;
    this.loading = true;
    await this.fetchPost();
    this.srcSet = generateSrcSet(this.postInfo.attachment);
    this.updatePlaceholder();
    this.loading = false;
  }

  mounted(): void {
    window.addEventListener("keydown", this.handleOnKeyDown);
    this.calculateImageWidth();
    this.currentIndex = this.posts.indexOf(String(this.postId));
    console.log("post-expanded", this.postInfo);
  }

  destroyed(): void {
    window.removeEventListener("keydown", this.handleOnKeyDown);
  }
}
// export default {
//   name: "post-expanded",
//   props: {
//     postId: Number,
//     posts: Array,
//     onClose: Function,
//   },
//   mixins: [keydown],
//   components: {
//     spinner: Spinner,
//     "post-content": PostContent,
//   },
//   data() {
//     return {
//       postInfo: {},
//       currentIndex: -1,
//       placeholder: {
//         bgColor: "",
//         height: 0,
//       },
//       srcSet: "",
//       loading: true,
//       imgWidth: POST_EXPANDED_WIDTH,
//     };
//   },
//   watch: {
//     async currentIndex(newValue) {
//       this.currentIndex = newValue;
//       this.loading = true;
//       await this.fetchPost();
//       this.srcSet = generateSrcSet(this.postInfo.attachment);
//       this.updatePlaceholder();
//       this.loading = false;
//     },
//   },
//   mounted() {
//     this.calculateImageWidth();
//     this.currentIndex = this.posts.indexOf(String(this.postId));
//   },
//   methods: {
//     async fetchPost() {
//       const postData = await getPostInfo(this.posts[this.currentIndex]);
//       this.postInfo = postData.attributes;
//     },
//     calculateImageWidth() {
//       const screenWidth = window.innerWidth;
//       const DESKTOP_MIN_WIDTH = 768;

//       if (screenWidth < DESKTOP_MIN_WIDTH) {
//         this.imgWidth = window.innerWidth;
//       }
//     },
//     updatePlaceholder() {
//       const placeholder = this.postInfo.preview_image;
//       const height = calculatePlaceholderHeight(
//         placeholder.width,
//         placeholder.height,
//         this.imgWidth
//       );

//       this.placeholder = {
//         bgColor: `rgb(${placeholder.dominant_color.join(",")})`,
//         height,
//       };
//     },
//     moveToNextPost() {
//       this.currentIndex += 1;
//     },
//     moveToPrevPost() {
//       this.currentIndex -= 1;
//     },
//     moveToFirstPost() {
//       this.currentIndex = 0;
//     },
//     moveToLastPost() {
//       this.currentIndex = this.posts.length - 1;
//     },
//     handleOnKeyDown(e) {
//       const ARROW_LEFT_KEYCODE = 37,
//         ARROW_RIGHT_KEYCODE = 39,
//         ESCAPE_KEYCODE = 27;

//       switch (e.keyCode) {
//         case ARROW_LEFT_KEYCODE:
//           if (this.currentIndex > 0) {
//             this.moveToPrevPost();
//           }
//           break;
//         case ARROW_RIGHT_KEYCODE:
//           if (this.currentIndex < this.posts.length - 1) {
//             this.moveToNextPost();
//           }
//           break;
//         case ESCAPE_KEYCODE:
//           this.onClose();
//           break;
//         default:
//           return;
//       }
//     },
//   },
// };
</script>
