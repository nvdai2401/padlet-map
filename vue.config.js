const path = require('path');

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/index.scss";`,
      },
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['*', '.js', '.vue', '.json', '.jpg'],
      alias: {
        src: path.resolve('src'),
      },
    },
  },
};
