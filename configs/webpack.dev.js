const path = require('path')
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = merge({
  mode: 'development',
  output: {
      filename: "app.bundle.js",
      path: path.join(__dirname, "../example/"),
      publicPath: 'example'
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../"),
    host: 'localhost',
    port: 8080,
  },
}, commonConfig)