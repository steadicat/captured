import {load} from '../lib/script';

function ga(...args) {
  ga.q.push(args);
};
ga.q = [];
ga.l = 1 * new Date();

export function init() {
  window.ga = ga;
  window.GoogleAnalyticsObject = 'ga';

  ga('create', 'UA-1809956-7', 'auto');
  ga('send', 'pageview');

  load('//www.google-analytics.com/analytics.js');
}
