const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (isDevelopment, cssOptions, isSaaS) => {
  return [
    isDevelopment
      ? require.resolve('style-loader')
      : MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          ident: 'postcss',
          plugins: () => [require('autoprefixer')()],
        },
        sourceMap: true,
      },
    },
    isSaaS && {
      loader: require.resolve('sass-loader'),
      options: {
        sourceMap: true,
      },
    },
  ];
};
