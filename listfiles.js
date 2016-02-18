const findit = require('findit2');

const DIR = '.'
const SKIP_FILES = `
- ^(.*/)?\\..*$
- ^Makefile$
- ^package\\.json$
- ^node_modules/.*$
- ^src/.*$
- ^etc/.*$
- ^misc/.*$
- ^[^/]*\\.js$
- ^[^/]*\\.yaml$
- ^[^/]*\\.md$
- ^.*\\.sublime-project$
- ^.*\\.sublime-workspace$
`;

const skip = SKIP_FILES.split('\n')
  .filter(f => f.length)
  .map(f => f.replace(/^- /, ''))
  .map(f => `(` + f + ')')
  .join('|');

const rule = new RegExp(skip);

const finder = findit(DIR);

var count = 0;

finder.on('file', function(file) {
  if (!rule.test(file)) {
    console.log(file);
    count++;
  }
});

finder.on('end', function () {
  console.log(count + ' files found');
});

