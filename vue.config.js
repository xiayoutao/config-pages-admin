/* eslint-disable camelcase */
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const resolve = dir => {
  return path.join(__dirname, dir);
};

const isProduction = process.env.npm_config_production === 'true';

module.exports = {
  lintOnSave: !isProduction,
  productionSourceMap: !isProduction,
  publicPath: '/', // 相对路径
  outputDir: 'dist',
  pages: {
    index: {
      entry: './pages/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '后台管理系统'
    },
    login: {
      entry: './pages/login/main.js',
      template: 'public/login.html',
      filename: 'login.html',
      title: '后台管理系统 - 登录'
    }
  },
  devServer: {
    open: true,
    port: 7000,
    proxy: {
      '/adminApi': {
        target: 'http://127.0.0.1:1339',
        // target: 'https://api.xiayoutao.wang',
        ws: true,
        changeOrigin: true,
      },
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/assets/styles/scss/variables.scss";'
      },
      postcss: {
        plugins: [
          autoprefixer(),
        ]
      }
    }
  },
  configureWebpack: {
    externals: {
      'axios': 'axios',
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      'echarts': 'echarts',
      'xlsx': 'XLSX',
    },
    optimization: {
      minimizer: [
        // 压缩es6
        new TerserPlugin({
          parallel: true, // 并行压缩
          cache: true, // 缓存
          sourceMap: false,
          terserOptions: {
            warnings: false,
            ie8: false,
            compress: {
              warnings: false, // 删除没有用到的代码时不输出警告
              drop_console: isProduction, // 移除console
              // pure_funcs: ['console.log'],
              drop_debugger: isProduction,
              // 提取出出现多次但是没有定义成变量去引用的静态值
              reduce_vars: true,
            },
          },
        }),
        // 压缩提取的CSS,删除来自不同组件重复的css
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            safe: true,
            discardComments: {
              removeAll: true,
            },
          },
        }),
      ],
    }
  },
  chainWebpack: config => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@cps', resolve('src/components'));

    if (process.env.useAnalyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
  }
};
