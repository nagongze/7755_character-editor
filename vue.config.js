const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: true,
    port: 8080,
    host: 'localhost'
  },
  configureWebpack: {
    resolve: {
      fallback: {
        "crypto": false,
        "stream": false,
        "util": false
      }
    }
  }
})
