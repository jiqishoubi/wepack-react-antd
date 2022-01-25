const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html模板
const cssLoader = {
  loader: 'css-loader',
  options: {
    // 启动css modules // antd为global，less文件以.global.less为后缀时为global
    modules: {
      localIdentName: '[path][name]__[local]__',
      mode: (resourcePath) => {
        if (resourcePath.indexOf('/node_modules/antd/') > -1 || resourcePath.indexOf('.global.less') > -1) {
          return 'global'
        }
        return 'local'
      },
    },
  },
}

const lessLoader = {
  loader: 'less-loader',
  options: {
    lessOptions: { javascriptEnabled: true },
  },
}

/**
 * config
 */
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    clean: true, // 每次构建清理dist
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', cssLoader, lessLoader],
      },
      // 编译文件
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        use: [
          {
            loader: 'url-loader', // 小的文件转成base64
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'], // 引入组件的时候可以省略这些后缀
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  devServer: {
    compress: true,
    hot: true,
    port: 9123,
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    // 全局自动引入react // 不用每个文件都 import React from 'react'
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    // 把编译时的变量设置到项目里
    new webpack.DefinePlugin({
      'process.env': {
        MODE: JSON.stringify(process.env.MODE), // 开发环境
        ENV: JSON.stringify(process.env.ENV), // 请求环境
      },
    }),
  ],
}
