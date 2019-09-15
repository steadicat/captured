import * as Page from './src/ui/page';
import * as ReactDOMServer from 'react-dom/server';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

import data from './src/data';
import {initialState} from './src/appState';

var paths = {
  '/': 'app/assets/index.html'
  /*  '/about': 'app/assets/about/index.html',
  '/orders': 'app/assets/orders/index.html',
  '/notfound': 'app/assets/notfound.html',
  '/error': 'app/assets/error.html'*/
};
/*
for (var i = 0, l = data.length; i < l; i++) {
  paths['/' + data[i].id] = 'app/assets/' + data[i].id + '/index.html';
  paths['/' + data[i].id + '/references'] =
    'app/assets/' + data[i].id + '/references/index.html';
  if (data[i].artistContact) {
    paths['/' + data[i].id + '/contact'] =
      'app/assets/' + data[i].id + '/contact/index.html';
  }
}
*/

for (var p in paths) {
  mkdirp.sync(path.dirname(paths[p]));
  fs.writeFileSync(
    paths[p],
    '<!DOCTYPE html>' +
      ReactDOMServer.renderToString(Page.createPage({...initialState, path: p}))
  );
}
