const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Common configuration
const paths = require('./paths');

module.exports = {
  entry: [paths.src + '/index.js'],
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: paths.public + '/assets',
          to: 'assets',
        },
        {
          from: paths.public + '/assets/js/main.js',
          to: paths.build + '/static/assets/js/main.js',
        },
        {
          from: paths.public + '/manifest.json',
          to: paths.build + '/static/manifest.json',
        },
        {
          from: paths.public + '/favicon.ico',
          to: paths.build + '/static/favicon.ico',
        },
      ],
    }),

    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      template: path.resolve(__dirname, '../public/index.html'),
      manifest: path.resolve(__dirname, '../public/manifest.json'),
      filename: 'index.html',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      fs: false,
      assert: require.resolve('assert'),
      buffer: false,
      console: false,
      constants: require.resolve('constants-browserify'),
      crypto: false,
      domain: false,
      events: false,
      http: false,
      https: false,
      os: false,
      path: require.resolve('path-browserify'),
      punycode: false,
      process: require.resolve('process/browser'),
      querystring: false,
      stream: false,
      string_decoder: false,
      sys: false,
      timers: false,
      tty: false,
      url: false,
      util: require.resolve('util'),
      vm: false,
      zlib: false,
    },
    alias: {
      '@assets': path.resolve(__dirname, '../public/assets/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(woff(2)|ttf|eot)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset/resource',
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|ico|webp)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'static/media',
            },
          },
        ],
      },
    ],
  },
};
