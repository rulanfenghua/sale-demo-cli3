const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        src: path.join(__dirname, 'src')
      }
    }
  },
  productionSourceMap: false,
  css: {
    // Enable CSS source maps.
    sourceMap: false
  },
  devServer: {
    open: true,
    ...(process.env.API_BASE_URL // Proxy API endpoints to the production base URL.
      ? { proxy: { '/api': { target: process.env.API_BASE_URL } } } // Proxy API endpoints a local mock API.
      : { before: require('./server') })
  }
};
