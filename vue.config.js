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
    host: '0.0.0.0',
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:7071',
        changeOrigin: true,
        ws: false
      },
    },
    // client: {
    //   webSocketURL: 'ws://0.0.0.0:8081/ws',
    // },
  },
});
