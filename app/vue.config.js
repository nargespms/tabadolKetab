const webpack = require('webpack');

module.exports = {
  transpileDependencies: ['vuetify', 'i18n'],
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ],
  },
};
