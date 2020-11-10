module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/padlet-map/' : '/',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/globals";
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
