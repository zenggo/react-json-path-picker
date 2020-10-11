const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, "src/react-json-path-picker.tsx"),
  output: {
      filename: "react-json-path-picker.js",
      path: path.join(__dirname, "lib"),
      libraryTarget: 'umd',
      libraryExport: 'default',
  },
  // devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: 'localhost',
    port: 8080,
  },
  resolve: {
      extensions: [".ts", ".tsx", ".js", ".json", ".css"]
  },
  module: {
      rules: [
          { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
          { test: /\.css$/, loader: "style-loader!css-loader" }
      ]
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
  },
}