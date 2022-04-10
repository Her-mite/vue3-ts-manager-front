const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   host: "0.0.0.0",
  //   // https:true,
  //   // port: 6103,
  //   client: {
  //     webSocketURL: "ws://0.0.0.0:8080/ws",
  //   },
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     changeOrigin: true,
  //   },
  // },

  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:7002',
        changeOrigin: true,
      },
    },
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
  },
});
