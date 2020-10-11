const path = require('path')
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = merge({
  mode: 'production',
  output: {
      filename: "app.bundle.js",
      path: path.join(__dirname, "../example/"),
  }
}, commonConfig)