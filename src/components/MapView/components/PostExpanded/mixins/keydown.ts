import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'

const KeyDownProps = Vue.extend({
  props: {
    posts: Array,
    onClose: Function,
  },
});

@Component
export default class KeyDown extends mixins(Vue, KeyDownProps) {
  currentIndex = -1;

  moveToNextPost(): void {
    this.currentIndex += 1;
  }
  moveToPrevPost(): void {
    this.currentIndex -= 1;
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

  mounted(): void {
    window.addEventListener("keydown", this.handleOnKeyDown);
  }

  destroyed(): void {
    window.removeEventListener("keydown", this.handleOnKeyDown);
  }
}
