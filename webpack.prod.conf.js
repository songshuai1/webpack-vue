'use strict'
const path = require('path')
const common = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')

const production = {
  mode: 'production',

  devtool: 'cheap-module-source-map',

  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'assets/js/[name]-[chunkhash:8]-bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.styl(us)?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
      }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',
      // 大于30KB才单独分离成chunk
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        // 打包重复出现的代码
        vendor: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: 'vendor'
        }
      }
    }
  },

  plugins: [
    // 生成HTML插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'VIPKID-AMS',
      filename: 'index.html',
      inject: 'body',
      chunks: ['manifest', 'vendor', 'index'],
      chunksSortMode: function (a, b) {
        const orders = ['manifest', 'vendor', 'index']
        return orders.indexOf(a.names[0]) - orders.indexOf(b.names[0])
      }
    }),

    // 固定现有模块ID值
    new webpack.HashedModuleIdsPlugin(),

    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[hash:8].css',
      chunkFilename: 'assets/css/chunk/[id].[hash:8].css'
    }),

    new webpack.optimize.RuntimeChunkPlugin({
      name: 'manifest'
    })
  ]
}

module.exports = merge(common, production)
