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
};
