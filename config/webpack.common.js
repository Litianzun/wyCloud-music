const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      favicon: "./src/images/logo.png",
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].css"
    }),
    new OptimizeCSSAssetsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg|ttf|woff2|woff)(\?.*)?$/,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 10000, // 限制大小
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
        use: [{ loader: "file-loader" }],
      },
    ],
  },
};
