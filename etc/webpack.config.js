/* eslint no-var: 0, node: true */
var path = require('path');
var webpack = require('webpack');
var config = require('../etc/config');
var AssetsPlugin = require('assets-webpack-plugin');

var debug = process.env.NODE_ENV != 'production';
var profile = process.env.PROFILE == 'true';
var babel = 'babel?' + JSON.stringify(require('../etc/babel'));

module.exports = {
  devServer: {
    port: config.ASSETS_PORT,
    contentBase: config.ASSETS_DIR + '/',
    hot: debug,
  },
  entry: debug ? [
    'webpack-dev-server/client?' + config.ASSETS_URL,
    'webpack/hot/only-dev-server',
    './src/captured',
  ] : [
    './src/captured',
  ],
  module: {
    loaders: [
      {test: /\.js$/, loaders: debug ? ['react-hot', babel] : [babel], exclude: /node_modules/},
      {test: /\.json$/, loader: 'json-loader'},
    ],
  },
  output: {
    library: 'Captured',
    filename: debug ? 'captured.js' : 'captured-[hash].js',
    path: config.ASSETS_DIR + '/',
    publicPath: config.ASSETS_URL + '/',
    pathinfo: debug && !profile,
  },
  externals: {
    StripeCheckout: 'var StripeCheckout',
  },
  devtool: debug && 'inline-source-map',
  plugins: [
    !debug && new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
    !profile && !debug && new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      comments: false,
      compress: {warnings: false},
    }),
    !debug && new AssetsPlugin({path: './assets', filename: 'manifest.json'}),
    debug && new webpack.HotModuleReplacementPlugin(),
  ].filter(function(x) { return !!x }),
};
