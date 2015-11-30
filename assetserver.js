/* eslint no-var: 0, node: true */
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./etc/webpack.config');
var config = require('./etc/config');

var app = express();
var compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(config.ASSETS_PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + config.ASSETS_PORT);
});
