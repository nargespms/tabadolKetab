const webpack = require('webpack')


module.exports = {
  transpileDependencies: ['vuetify', 'axios', 'i18n'],
   configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
      ]
  }
};
