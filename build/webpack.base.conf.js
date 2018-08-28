'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

// 计算路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// 动态创建 eslint 的规则
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  /**
   * webpack 打包的入口，方式：
   * 1. 字符串： entry: './src/main.js'
   * 2. 多入口数组：entry: ['./src/main.js', './src/main1.js']
   * 3. 多入口对象: entry: { index: './src/index.js', login: './src/index2.js'}
   */
  entry: {
    app1: './src/main.js'
  },
  /**
   * output 资源生成规则
   */
  output: {
    // path: 表示生成文件的根目录，是一个绝对路径，webpack 将会写入改目录
    // 一般为 dist 目录
    path: config.build.assetsRoot,
    // 表示入口文件的名称规则，对应 entry 的 key
    // 1. [name] 代指 entry 里面的 key（app）
    // 2. [hash] 本次编译的hash版本
    filename: '[name].js',
    // 用于生成资源访问路径
    // 用于生成css/js/images/pic/font等资源的路径，以确保被浏览器正确加载
    // e.g:
    // 开发模式：可以使用 ./test.png 来加载 test.png 图片
    // 生成环境：则使用 https:// CDN / test.png 
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  /**
   * 解析
   * 作用：Resolve 配置 webpack 如何寻找模块对应的文件
   */
  resolve: {
    // import 语句没带文件后缀，webpack会带上再去访问文件是否存在，
    // extensions 用于配置在尝试过程中用的后缀列表
    extensions: ['.js', '.vue', '.json'],
    // 包目录别名，不用再...,可直接使用 common/.../...
    alias: {
      'src': resolve('src'),
      'common': resolve('src/common'),
      'cpnts': resolve('src/components'),
      'base': resolve('src/base'),
      'api': resolve('src/api')
    }
  },
  // 资源解析器规则配置
  // 配置资源对应的解析器，并返回解析后的文件
  module: {
    // 通过 rules，webpack 可以针对每一种特定的资源做出相应的处理
    // 1. test指示配置项针对那些资源
    // 2. exclude 用来剔除忽略掉的资源
    // 3. include 表示针对的文件
    // 4. loader 用来指示哪个 Loader 来处理目标资源
    // 其中：
    // ! 是一种分隔符，e.g:
    // loader: 'css?!postcss?less' ，执行顺序为：css-laoder,postcss-loader,less-loader
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 生成到 static/img/目录下
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
