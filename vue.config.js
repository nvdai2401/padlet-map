const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-gmap/' : '/',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/mixins.scss";
          @import "@/assets/styles/quick_classes.scss";
        `,
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
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = "Map of Countries I'd like to visit";
      return args;
    });
  },
};
