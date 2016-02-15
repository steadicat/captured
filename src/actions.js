import sha1 from 'sha1';
import mutatis from 'mutatis';
import superagent from 'superagent';
import config from '../etc/config';
import * as webp from './lib/webp';
import throttle from './lib/throttle';
import * as scroll from './lib/scroll';
import * as history from './lib/history';
import * as tracking from './lib/tracking';
import {getThumbnailSize, getFullScreenSize, idFromPath, pieceById, isExpanded} from './ui/gallerylayout';
import {trimPathEnd} from './lib/strings';

export function init(path) {
  return mutatis({
    path,
    main: config.JS_MAIN,
    title: 'Captured',
    sold: 0,
    total: 1000,
    price: 40,
    browser: {
      width: 800,
      height: 600,
      pixelRatio: 1,
      webp: false,
      known: false,
    },
    positions: {},
    orders: {},
    orderStatus: 'created',
  });
}

/* global window, document, setInterval, setTimeout, clearTimeout */

export function clientInit(get, actions) {
  webp.detectSupport(window.navigator.userAgent, actions.detectWebP);

  actions.requestSoldUpdate();
  setInterval(actions.requestSoldUpdate, 30000);

  let shown = false;

  /* TODO: remove unlock code */
  if (window.localStorage) {
    /* global localStorage */
    const bits = get('path').split('/');
    if (bits.length === 3 && bits[0] === '' && bits[1] === 'unlock') {
      localStorage.setItem('unlock', bits[2]);
      if (bits[2] && sha1(bits[2]) === config.UNLOCK_KEY) {
        shown = true;
      }
    } else {
      const unlock = localStorage.getItem('unlock');
      if (unlock && sha1(unlock) === config.UNLOCK_KEY) {
        shown = true;
      }
    }
  }

  actions.browserResize();
  window.addEventListener(typeof window.orientation === 'undefined' ? 'resize' : 'orientationchange', throttle(actions.browserResize));
  history.onChange(actions.navigate);
  window.addEventListener('keydown', actions.keyDown);
  tracking.init();

  if (isExpanded(get('path'))) {
    actions.expandStarted(idFromPath(get('path')));
  }

  return get()
    .set('shown', shown)
    .set('browser.pixelRatio', window.devicePixelRatio || 1)
    .set('browser.known', true)
    .set('needsScroll', get('path') !== '/');
}

export function browserResize(get, actions) {
  const w = document.body.clientWidth;
  return get()
    .set('browser.mobile', w < 740)
    .set('browser.width', w)
    .set('browser.height', window.innerHeight);
}

export function detectWebP(get, actions, supported) {
  return get().set('browser.webp', supported);
}

export function show(get, actions) {
  return get().set('shown', true);
}

export function requestSoldUpdate(get, actions) {
  superagent.get(`${config.API_URL}/sold`, (err, res) => {
    if (err) return console.warn(err);
    actions.updateSold(res.body.sold);
  });
}

export function updateSold(get, actions, sold) {
  return get().set('sold', sold);
}

export function positionElement(get, actions, id, {top, bottom}) {
  let store = get();
  if (get('needsScroll') && (idFromPath(get('path')) === id)) {
    scroll.scrollTo(top, actions.scrollingDone);
    store = store
      .set('scrolling', true)
      .set('needsScroll', false);
  }
  return store.set(`positions.${id}`, {top, bottom});
}

export function scrollingDone(get, actions) {
  return get().set('scrolling', false);
}

export function navigate(get, actions, path) {
  const previousPath = get('path');
  const id = idFromPath(path);
  const position = get('positions')[id];
  let scrolling = false;
  if (position && (id !== '')) {
    const browser = get('browser');
    const piece = pieceById(id);
    let fullScreenHeight = getFullScreenSize(piece, browser)[1];
    let top = position.top + getThumbnailSize(piece, browser)[1] / 2 - fullScreenHeight / 2;
    scroll.scrollTo(top, actions.scrollingDone);
    scrolling = true;
    actions.expandStarted(id);
  } else if (path === '/about' || previousPath === '/about') {
    scroll.scrollTo(0, actions.scrollingDone);
    scrolling = true;
  } else if (isExpanded(previousPath) && !isExpanded(path)) {
    actions.collapseStarted(idFromPath(previousPath));
  }
  return get()
    .set('scrolling', scrolling)
    .set('path', path);
}

export function keyDown(get, actions, event) {
  if (event.keyCode === 27 && get('path') !== '/') {
    const href = trimPathEnd(get('path'));
    history.pushState(href);
    actions.navigate(href);
  }
}

let expandEndTimeout;
let showCrimesTimeout;

export function expandStarted(get, actions, id) {
  clearTimeout(expandEndTimeout);
  clearTimeout(showCrimesTimeout);
  expandEndTimeout = setTimeout(actions.expandEnded, 600);
  return get().set('expanding', id);
}

export function expandEnded(get, actions) {
  if (!get('expanding')) return;
  if (!get('scrollPromptDismissed')) {
    showCrimesTimeout = setTimeout(actions.showScrollPrompt, 1500);
    disableScrollListener();
  }
  return get().set('expanding', null);
}

function enableScrollListener() {
  let scroll = document.getElementById('scroll');
  if (scroll) {
    scroll.addEventListener('scroll', actions.cancelScrollPrompt);
  }
}

function disableScrollListener() {
  let scroll = document.getElementById('scroll');
  if (scroll) {
    scroll.removeEventListener('scroll', actions.cancelScrollPrompt);
  }
}

export function collapseStarted(get, actions, id) {
  clearTimeout(expandEndTimeout);
  clearTimeout(showCrimesTimeout);
  expandEndTimeout = setTimeout(actions.collapseEnded, 600);
  if (get('seeCrimesShown')) disableScrollListener();
  return get()
    .set('expanding', id)
    .set('seeCrimesShown', false);
}

export function collapseEnded(get, actions) {
  if (!get('expanding')) return;
  return get().set('expanding', null);
}

export function showScrollPrompt(get, actions) {
  if (get('scrollPromptDismissed')) return;
  const amount = 200;
  const delay = 200;
  scroll.scrollElementTo('scroll', amount);
  setTimeout(scroll.scrollElementTo.bind(scroll, 'scroll', 0), delay);
  setTimeout(scroll.scrollElementTo.bind(scroll, 'scroll', amount), delay*2);
  setTimeout(scroll.scrollElementTo.bind(scroll, 'scroll', 0), delay*3);
  actions.cancelScrollPrompt()
}

export function cancelScrollPrompt(get, actions) {
  disableScrollListener();
  clearTimeout(showCrimesTimeout);
  return get()
    .set('scrollPromptDismissed', true)
    .set('seeCrimesShown', false);
}

export function scrollToCrimes(get, actions) {
  const piece = pieceById(idFromPath(get('path')));
  let fullScreenHeight = getFullScreenSize(piece, get('browser'))[1];
  scroll.scrollElementTo('scroll', fullScreenHeight + 48, actions.scrollingDone);
  return get()
    .set('seeCrimesShown', false)
    .set('scrollPromptDismissed', true);
}

export function stripeDialogRequested(get, actions) {
  return get().set('stripeDialogRequested', true);
}

export function stripeDialogShown(get, actions) {
  return get().set('stripeDialogShown', true);
}

export function stripeDialogHidden(get, actions) {
  return get()
    .set('stripeDialogShown', false)
    .set('stripeDialogRequested', false);
}

export function purchaseCompleted(get, actions) {
  setTimeout(actions.requestSoldUpdate, 1000);
}

function keyBy(key, list) {
  const res = {};
  list.forEach(el => {
    res[el[key]] = el;
  });
  return mutatis(res);
}

/* global alert */

export function fetchOrders(get, actions) {
  if (get('ordersLoaded')) return;
  superagent.get(`${config.API_URL}/orders`, {status: get('orderStatus')}, (err, res) => {
    if (err) return alert(err);
    actions.updateOrders(res.body.orders);
  });
  return get().set('ordersLoading', true);
}

export function updateOrders(get, actions, orders) {
  return get()
    .set('orders', keyBy('id', orders))
    .remove('ordersLoading')
    .set('ordersLoaded', true);
}

export function chargeOrder(get, actions, orderID, customerID) {
  superagent
    .post(`${config.API_URL}/charge`)
    .query({orderID, customerID})
    .end((err, res) => actions.orderCharged(orderID, err, res));
  return get().set(`orders.${orderID}.status`, 'charging');
}

export function orderCharged(get, actions, orderID, err, res) {
  if (err) {
    alert(err);
    return get().set(`orders.${orderID}.status`, 'created')
  }
  return get().set(`orders.${orderID}.status`, 'paid');
}

export function shipOrder(get, actions, orderID, trackingNumber) {
  superagent
    .post(`${config.API_URL}/ship`)
    .query({orderID, trackingNumber})
    .end((err, res) => actions.orderShipped(orderID, trackingNumber, err, res));
  return get().set(`orders.${orderID}.status`, 'shipping');
}

export function orderShipped(get, actions, orderID, trackingNumber, err, res) {
  if (err) {
    alert(err);
    return get().remove(`orders.${orderID}.status`, 'paid');
  }
  return get()
    .set(`orders.${orderID}.metadata.tracking_number`, trackingNumber)
    .set(`orders.${orderID}.status`, 'fulfilled');
}

export function selectOrders(get, actions, status) {
  setTimeout(actions.fetchOrders, 0);
  return get().set('orders', {}).set('ordersLoaded', false).set('orderStatus', status);
}
