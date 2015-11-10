/* eslint-env node */
/* eslint no-var: 0 */
var prod = process.env.NODE_ENV === 'production';

function getJSMain() {
  try {
    return require('../assets/manifest.json').main.js;
  } catch (e) {
    return '/captured.js'
  }
}

function getLocalConfig() {
  try {
    return require('../etc/local.js');
  } catch (e) {
    return {};
  }
}

function getImages() {
  try {
    return require('../assets/images.json').images;
  } catch (e) {
    return {};
  }
}

const config = {
  ASSETS_DIR: './assets',
  ASSETS_URL: prod ? '' : 'http://localhost:3000',
  ASSETS_PORT: 3000,
  JS_MAIN: prod ? getJSMain() : '/captured.js',
  API_URL: prod ? '/api' : 'http://localhost:8080/api',
  IMAGES_URL: prod ? '/api/images' : 'http://localhost:8080/api/images',
  STRIPE_KEY: 'pk_test_Ngkeht8dNP1Nm71uEYG9tS2Z',
  UNLOCK_KEY: 'c75e155a857bac5bf33db59a2962192bd960be77',
  IMAGES: getImages(),
};

const local = getLocalConfig();

for (var key in local) {
  config[key] = local[key];
}

module.exports = config;

