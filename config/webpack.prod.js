const common = require("./webpack.common");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const path = require("path");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    filename: "[name].[chunkhash:8].js",
    path: path.resolve(__dirname, "../dist"),
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    // minimizer: [new UglifyJsPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new UglifyJsPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new OptimizeCSSAssetsPlugin(),
  ],
  performance: {
    hints: "error",
  },
});
