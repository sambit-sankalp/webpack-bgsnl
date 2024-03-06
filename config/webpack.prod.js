const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Common configuration
const common = require('./webpack.common.js');
const getStyleLoaders = require('./common.js');
const paths = require('./paths');

// Regex for CSS and SASS
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: path.resolve(__dirname, paths.build),
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
  },
  plugins: [
    new CompressionPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
  ],
  module: {
    rules: [
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders(false, { importLoaders: 1, sourceMap: false }),
        sideEffects: true,
      },
      {
        test: cssModuleRegex,
        use: getStyleLoaders(false, {
          importLoaders: 1,
          sourceMap: false,
          modules: true,
        }),
        sideEffects: true,
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders(
          false,
          { importLoaders: 2, sourceMap: false },
          true
        ),
        sideEffects: true,
      },
      {
        test: sassModuleRegex,
        use: getStyleLoaders(
          false,
          {
            importLoaders: 2,
            sourceMap: false,
            modules: true,
          },
          true
        ),
        sideEffects: true,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
});
