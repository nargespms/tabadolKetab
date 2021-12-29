const webpack = require('webpack');

module.exports = {
  transpileDependencies: ['vuetify', 'i18n', 'tus-js-client'],
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ],
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
  },
  publicPath:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:80'
      : 'https://book.tabadolketab.com',
};
