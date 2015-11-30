/* eslint-env node */
/* eslint no-console: 0, no-var: 0 */
require('babel-core/register')();
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var ducts = require('ducts');
var ReactDOMServer = require('react-dom/server');
var Page = require('./src/ui/page');
var actions = require('./src/actions');
var data = require('./src/data');
var config = require('./etc/config');

var paths = {
  '/': 'assets/index.html',
  '/act': 'assets/act/index.html',
  '/orders': 'assets/orders/index.html',
};

paths['/unlock/' + config.UNLOCK_CODE] = 'assets/unlock/' + config.UNLOCK_CODE + '/index.html';

for (var i = 0, l = data.length; i < l; i++) {
  paths['/' + data[i].id + '/'] = 'assets/' + data[i].id + '/index.html';
}

for (var p in paths) {
  mkdirp.sync(path.dirname(paths[p]));
  var store = actions.init(p);
  var state = ducts.createStore(store, actions);
  fs.writeFileSync(paths[p], '<!DOCTYPE html>' + ReactDOMServer.renderToString(Page.createPage(state.get, state.actions)));
}
