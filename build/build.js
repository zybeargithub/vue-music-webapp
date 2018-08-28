'use strict'
require('./check-versions')()

// process 对象用于处理与当前进程相关的事情，全部对象，EventEmitter 实例
// process.env 则为当前系统环境变量信息对象
process.env.NODE_ENV = 'production'

const ora = require('ora') // Elegant terminal spinner (高雅命令行工具)
const rm = require('rimraf') // rm -rf for node
const path = require('path')
const chalk = require('chalk') // Terminal string styling done right
const webpack = require('webpack') // 使用 webpack 命令执行配置
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

// 启动命令行执行等待效果
const spinner = ora('building for production...')
spinner.color = 'yellow'
spinner.start()

// 删除 assetsRoot + assetsSubDirectory 目录下的文件和文件夹，回调必定执行
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  // 如果有错误，则抛出
  if (err) throw err

  // 开始编译 prod.conf 文件， 并执行回调
  webpack(webpackConfig, (err, stats) => {
    spinner.stop() // 停止命令行执行等待效果...
    // 如果有错误，则抛出
    if (err) throw err

    console.log(chalk.yellow('stats information is printed bellow.'))

    // 打印输出当前打包的状态和资源列表（名称，大小，分割包等）
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    // 遇到错误，则打印错误，并且退出命令行
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1) // 退出命令执行
    }

    // 颜色打印器
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
