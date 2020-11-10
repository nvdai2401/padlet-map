module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/padlet-map/' : '/',
  lintOnSave: false,
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = "Map of Countries I'd like to visit";
      return args;
    });
  },
};
