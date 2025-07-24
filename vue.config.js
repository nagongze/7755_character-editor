const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // GitHub Pages 部署設定
  publicPath: process.env.NODE_ENV === 'production' 
    ? '/character-editor/' 
    : '/',
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
