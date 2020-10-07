const keydown = {
  mounted() {
    window.addEventListener('keydown', this.handleOnKeyDown);
  },
  destroyed() {
    window.removeEventListener('keydown', this.handleOnKeyDown);
  },
};

export default keydown;
