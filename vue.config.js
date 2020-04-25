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
        // target: 'http://127.0.0.1:1338',
        target: 'https://api.xiayoutao.wang',
        ws: true,
        changeOrigin: true,
      },
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/styles/scss/variables.scss";'
      },
      postcss: {
        plugins: [
          autoprefixer()
        ]
      }
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      config.optimization = {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            },
            echarts: {
              name: 'vuedraggable',
              priority: 100,
              test: /[\\/]node_modules[\\/]vuedraggable[\\/]/,
              chunks: 'all',
              reuseExistingChunk: true,
            },
            'qiniu-js': {
              name: 'qiniu-js',
              priority: 100,
              test: /[\\/]node_modules[\\/]qiniu-js[\\/]/,
              chunks: 'all',
              reuseExistingChunk: true,
            },
            'element-ui': {
              name: 'element-ui', // 单独将 element-ui 拆包
              priority: 1000, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
              test: /[\\/]node_modules[\\/]element-ui[\\/]/,
              chunks: 'all',
              reuseExistingChunk: true,
            }
          }
        },
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
      };
    }
  },
  chainWebpack: config => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@cps', resolve('src/components'));
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 5120
      }));
  }
};
