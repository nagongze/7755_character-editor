const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '',
  devServer: {
    https: true,
    port: 8080,
    host: 'localhost'
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@use "sass:math"; @use "~@/assets/styles/common.scss" as *;`
      }
    }
  },
  configureWebpack: {
    resolve: {
      fallback: {
        "crypto": false,
        "stream": false,
        "util": false
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
  }
})
