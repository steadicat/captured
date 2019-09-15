/* eslint-env node */
/* eslint no-console: 0, no-var: 0 */

import * as Page from './src/ui/page';
import * as ReactDOMServer from 'react-dom/server';
import * as actions from './src/actions';
import * as ducts from './src/ducts';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

import data from './src/data';

var paths = {
  '/': 'app/assets/index.html',
  '/about': 'app/assets/about/index.html',
  '/orders': 'app/assets/orders/index.html',
  '/notfound': 'app/assets/notfound.html',
  '/error': 'app/assets/error.html'
};

for (var i = 0, l = data.length; i < l; i++) {
  paths['/' + data[i].id] = 'app/assets/' + data[i].id + '/index.html';
  paths['/' + data[i].id + '/references'] =
    'app/assets/' + data[i].id + '/references/index.html';
  if (data[i].artistContact) {
    paths['/' + data[i].id + '/contact'] =
      'app/assets/' + data[i].id + '/contact/index.html';
  }
}

for (var p in paths) {
  mkdirp.sync(path.dirname(paths[p]));
  var store = actions.init(p);
  var state = ducts.createStore(store, actions);
  fs.writeFileSync(
    paths[p],
    '<!DOCTYPE html>' +
      ReactDOMServer.renderToString(Page.createPage(state.get, state.actions))
  );
}
