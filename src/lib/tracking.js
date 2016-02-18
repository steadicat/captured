import {load} from '../lib/script';
import config from '../../etc/config';

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

  load('//www.google-analytics.com/analytics.js');
}

export function navigation() {
  init();
  ga('send', 'pageview');
}

export function error(e) {
  init();
  /* global navigator */
  ga('send', 'event', 'exception', e.message || e, e.stack || (e.filename + ':' + e.lineno), {
    nonInteraction: true,
    jsMain: config.JS_MAIN,
    ua: navigator.userAgent,
  });
}
