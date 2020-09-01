const common = require("./webpack.common");
const merge = require("webpack-merge");
const webpack = require("webpack");

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: "development",
  devServer: {
    contentBase: "../dist",
    port: 1234,
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  performance: {
    hints: 'warning'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
