import {load} from '../lib/script';
import config from '../../etc/config';

function ga(...args) {
  if (process.env.NODE_ENV !== 'production') {
    console.info(args);
  }
  ga.q.push(args);
}
ga.q = [];
ga.l = 1 * new Date();

export function init() {
  /* global window */
  window.ga = ga;
  window.GoogleAnalyticsObject = 'ga';

  ga('create', 'UA-1809956-7', 'auto');
  ga('send', 'pageview');

  load('//www.google-analytics.com/analytics.js');
}

export function error(e) {
  ga('send', 'event', 'exception', (e.name || '') + ': ' + (e.message || e),  e.stack || (e.filename + ':' + e.lineno), {
    nonInteraction: 1,
    jsMain: config.JS_MAIN,
    ua: navigator.userAgent,
  });
}
