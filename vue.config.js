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
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = "Map of Countries I'd like to visit";
      return args;
    });
  },
};
