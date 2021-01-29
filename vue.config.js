// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/padlet-map/" : "/",
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        // prevent error with components customizing like v-model
        vue$: "vue/dist/vue.esm.js",
        "@": path.resolve("src"),
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Map of Countries I'd like to visit";
      return args;
    });
  },
};
