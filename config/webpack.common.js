const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");
const tsImportPluginFactory = require("ts-import-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
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
      chunkFilename: "[name].[contenthash:8].css",
    }),
    new CheckerPlugin(),
  ],
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@": path.resolve("src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
      // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        // use: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
              libraryName: 'antd',
              libraryDirectory: 'lib',
              style: "css"
            })],
          }),
        },
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
      {
        test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
        use: [{ loader: "file-loader" }],
      },
    ],
  },
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM",
  // },
};
