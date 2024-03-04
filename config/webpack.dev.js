const path = require('path');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('./paths.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, paths.build),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, paths.build),
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new InterpolateHtmlPlugin({ PUBLIC_URL: 'static' }),
  ],
});
