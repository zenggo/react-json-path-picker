const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, "./example/app.tsx"),
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  output: {
      filename: "[name].bundle.js",
      path: path.join(__dirname, "./example")
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "./example"),
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
}