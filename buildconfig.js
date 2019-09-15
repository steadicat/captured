/* eslint-env node */
/* eslint no-var: 0 */
var fs = require('fs');
var findit = require('findit2');

const ROOT = 'app/';
const FILES = 'app/assets';
const TEMPLATE = 'app/app.template.yaml';
const OUTPUT = 'app/app.yaml';
const PLACEHOLDER = '%STATIC%\n';

function handler(url, file, add) {
  // url = url.replace(/^app/, '');
  if (/\.html$/.test(file)) {
    url = url.replace(/\/index\.html$/, '');
    url = url.replace(/\.html$/, '');

    if (/^\/orders(\/|$)/.test(url)) {
      add({
        url: url + '/?',
        file: file,
        mime_type: 'text/html; charset=UTF-8',
        login: 'admin'
      });
    } else {
      add({
        url: url + '/?',
        file: file,
        mime_type: 'text/html; charset=UTF-8'
      });
    }
  } else if (/\.js(on)?$/.test(file)) {
    // skip
  } else {
    // skip
  }
}

function toYaml(obj) {
  return (
    '- ' +
    Object.keys(obj)
      .map(key => {
        return key + ': ' + obj[key];
      })
      .join('\n  ')
  );
}
function generate(yaml) {
  var entries = '';

  function addEntry(info) {
    if (info.file) {
      info.static_files = info.file;
      info.upload = info.file.replace(/\./g, '\\.');
      delete info.file;
    }
    info.url = info.url.replace(/\./g, '\\.');
    info.secure = 'always';
    var entry = toYaml(info);
    // console.log(entry);
    entries += entry + '\n';
  }

  var finder = findit(FILES);

  finder.on('file', function(file) {
    var request = file.substring(FILES.length);
    file = file.substring(ROOT.length);
    if (/\/\./.test(file)) return;
    return handler(request, file, addEntry);
  });

  finder.on('end', function() {
    yaml = yaml.replace(PLACEHOLDER, entries);

    fs.writeFile(OUTPUT, yaml, function(error) {
      if (error) return console.error(error);
    });
  });
}

fs.readFile(TEMPLATE, 'utf8', function(error, data) {
  if (error) return console.error(error);
  generate(data);
});
