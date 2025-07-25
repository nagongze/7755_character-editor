const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  // GitHub Pages 部署設定
  publicPath: '/character-editor/' ,
  devServer: {
    https: true,
    port: 8080,
    host: 'localhost'
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/common.scss";`
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
    ],
    // 優化分塊策略
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            chunks: 'initial'
          },
          elementPlus: {
            name: 'element-plus',
            priority: 20,
            test: /[\\/]node_modules[\\/]element-plus[\\/]/
          }
        }
      }
    }
  }
})
