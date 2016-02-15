/* eslint no-var: 0, node: true */
var path = require('path');
var webpack = require('webpack');
var config = require('../etc/config');
var AssetsPlugin = require('assets-webpack-plugin');

var debug = process.env.NODE_ENV != 'production';
var profile = process.env.PROFILE == 'true';

module.exports = {
  entry: debug ? [
    'webpack-hot-middleware/client?path=' + config.ASSETS_URL + '/__webpack_hmr',
    './src/captured',
  ] : [
    './src/captured',
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.json$/, loader: 'json-loader'},
    ],
  },
  output: {
    library: 'Captured',
    filename: debug ? 'captured.js' : 'captured-[hash].js',
    path: path.join(__dirname, '..', config.ASSETS_DIR + '/'),
    publicPath: config.ASSETS_URL + '/',
    pathinfo: debug && !profile,
  },
  externals: {
    StripeCheckout: 'var StripeCheckout',
  },
  devtool: debug && ['eval', 'inline-source-map'],
  plugins: [
    !debug && new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
    !profile && !debug && new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      comments: false,
      compress: {warnings: false},
    }),
    !debug && new AssetsPlugin({path: './assets', filename: 'manifest.json'}),
    debug && new webpack.HotModuleReplacementPlugin(),
    !debug && new webpack.optimize.DedupePlugin(),
  ].filter(function(x) { return !!x }),
};
