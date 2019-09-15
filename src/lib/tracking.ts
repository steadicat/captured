import config from '../../config';
import {load} from '../lib/script';

let initialized = false;

function ga(...args) {
  if (process.env.NODE_ENV !== 'production') {
    console.info(args);
  }
  ga.q.push(args);
}
ga.q = [];
ga.l = 1 * new Date();

export function init() {
  if (initialized) return;
  initialized = true;

  /* global window */
  window.ga = ga;
  window.GoogleAnalyticsObject = 'ga';

  ga('create', 'UA-1809956-7', 'auto');
  ga('send', 'pageview');

  if (process.env.NODE_ENV === 'production') {
    load('//www.google-analytics.com/analytics.js');
  }
}

export function navigation(path) {
  init();
  window.ga('send', 'pageview', path);
}

export function error(e) {
  init();
  /* global navigator */
  window.ga(
    'send',
    'event',
    'exception',
    e.message || e,
    e.stack || e.filename + ':' + e.lineno,
    {
      nonInteraction: true,
      jsMain: config.JS_MAIN,
      ua: navigator.userAgent
    }
  );
}
