const merge = require('webpack-merge')
const common = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')

const Config = require('./dev.config')

const DevConfig = Config.devConfig

const dev = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './output',
    host: DevConfig.Host,
    port: DevConfig.Port,
    hot: true,
    historyApiFallback: true,
    clientLogLevel: 'none'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.styl(us)?$/,
        use: ['vue-style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  },
  plugins: [
    // 生成HTML插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'VIPKID-AMS',
      filename: 'index.html',
      inject: 'body',
      chunks: ['vendor', 'index']
    }),
    // 清理输出插件
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['dist'] }),
    // 热插拔插件
    new FriendlyErrorsPlugin(),
    // 热更新插件
    new webpack.HotModuleReplacementPlugin()
  ]
}
module.exports = merge(common, dev)
