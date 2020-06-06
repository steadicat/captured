import * as history from './lib/history';
import * as scroll from './lib/scroll';
import * as tracking from './lib/tracking';
import * as webp from './lib/webp';

import {
  getFullScreenSize,
  getThumbnailSize,
  idFromPath,
  isExpanded,
  pieceById,
} from './ui/gallerylayout';

import config from '../config';
import mutatis from 'mutatis';
import superagent from 'superagent';
import throttle from './lib/throttle';
import {trimPathEnd} from './lib/strings';

export function init(path: string) {
  return mutatis({
    path,
    main: config.JS_MAIN,
    title: 'Captured',
    sold: 0,
    total: 1000,
    price: 30,
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

export function clientInit(get: Get, actions: Actions) {
  webp.detectSupport(window.navigator.userAgent, actions.detectWebP);

  actions.requestSoldUpdate();
  setInterval(actions.requestSoldUpdate, 30000);

  let shown = false;

  actions.browserResize();
  window.addEventListener(
    typeof window.orientation === 'undefined' ? 'resize' : 'orientationchange',
    throttle(actions.browserResize)
  );
  history.onChange(actions.navigate);
  window.addEventListener('keydown', actions.keyDown);

  if (isExpanded(get('path'))) {
    scrollPromptTimeout = setTimeout(actions.showScrollPrompt, 3000);
    enableScrollListener(get, actions);
  }

  return get()
    .set('shown', shown)
    .set('browser.pixelRatio', window.devicePixelRatio || 1)
    .set('browser.known', true)
    .set('needsScroll', get('path') !== '/');
}

export function browserResize(get: Get, actions: Actions) {
  const w = document.body.clientWidth;
  const h = Math.min(
    window.innerHeight,
    window.screen ? window.screen.height : Infinity
  );
  return get()
    .set('browser.mobile', w < 740)
    .set('browser.width', w)
    .set('browser.height', h);
}

export function detectWebP(get, actions: Actions, supported) {
  return get().set('browser.webp', supported);
}

export function show(get: Get, actions: Actions) {
  return get().set('shown', true);
}

export function requestSoldUpdate(get: Get, actions: Actions) {
  superagent.get(`${config.API_URL}/sold`, (err, res) => {
    if (err) return console.warn(err);
    actions.updateSold(res.body.sold);
  });
}

export function updateSold(get: Get, actions: Actions, sold) {
  return get().set('sold', sold);
}

export function positionElement(
  get: Get,
  actions: Actions,
  id: string,
  {top, bottom}: {top: number; bottom: number}
) {
  let store = get();
  if (get('needsScroll') && idFromPath(get('path')) === id) {
    scroll.scrollTo(top, actions.scrollingDone);
    store = store.set('scrolling', true).set('needsScroll', false);
  }
  return store.set(`positions.${id}`, {top, bottom});
}

export function scrollingDone(get: Get, actions: Actions) {
  return get().set('scrolling', false);
}

export function navigate(get: Get, actions: Actions, path: string) {
  const previousPath = get('path');
  const id = idFromPath(path);
  const position = get('positions')[id];
  let scrolling = false;
  if (position && id !== '') {
    const browser = get('browser');
    const piece = pieceById(id);
    let fullScreenHeight = getFullScreenSize(piece, browser)[1];
    let top =
      position.top +
      getThumbnailSize(piece, browser)[1] / 2 -
      fullScreenHeight / 2;
    scroll.scrollTo(top, actions.scrollingDone);
    scrolling = true;
    actions.expandStarted(id);
  } else if (path === '/about' || previousPath === '/about') {
    scroll.scrollTo(0, actions.scrollingDone);
    scrolling = true;
  } else if (isExpanded(previousPath) && !isExpanded(path)) {
    actions.collapseStarted(idFromPath(previousPath));
  }
  tracking.navigation(path);
  return get().set('scrolling', scrolling).set('path', path);
}

export function keyDown(get, actions: Actions, event) {
  if (event.keyCode === 27 && get('path') !== '/') {
    const href = trimPathEnd(get('path'));
    history.pushState(href);
    actions.navigate(href);
  }
}

let expandEndTimeout;
let scrollPromptTimeout;

export function expandStarted(get, actions: Actions, id) {
  clearTimeout(expandEndTimeout);
  clearTimeout(scrollPromptTimeout);
  expandEndTimeout = setTimeout(actions.expandEnded, 600);
  return get().set('expanding', id);
}

export function expandEnded(get: Get, actions: Actions) {
  if (!get('expanding')) return;
  if (!get('scrollPromptDismissed')) {
    scrollPromptTimeout = setTimeout(actions.showScrollPrompt, 1000);
    enableScrollListener(get, actions);
  }
  return get().set('expanding', null);
}

function enableScrollListener(get: Get, actions: Actions) {
  let el = document.getElementById('scroll');
  if (el) {
    el.addEventListener('scroll', actions.cancelScrollPrompt);
  }
}

function disableScrollListener(get: Get, actions: Actions) {
  let el = document.getElementById('scroll');
  if (el) {
    el.removeEventListener('scroll', actions.cancelScrollPrompt);
  }
}

export function collapseStarted(get: Get, actions: Actions, id: string) {
  clearTimeout(expandEndTimeout);
  clearTimeout(scrollPromptTimeout);
  expandEndTimeout = setTimeout(actions.collapseEnded, 600);
  if (get('seeCrimesShown')) disableScrollListener(get, actions);
  return get().set('expanding', id).set('seeCrimesShown', false);
}

export function collapseEnded(get: Get, actions: Actions) {
  if (!get('expanding')) return;
  return get().set('expanding', null).set('scrollPromptDismissed', false);
}

export function showScrollPrompt(get: Get, actions: Actions) {
  if (get('scrollPromptDismissed')) return;
  enableScrollListener(get, actions);
  return get().set('seeCrimesShown', true);
}

export function cancelScrollPrompt(get: Get, actions: Actions) {
  disableScrollListener(get, actions);
  clearTimeout(scrollPromptTimeout);
  return get().set('scrollPromptDismissed', true).set('seeCrimesShown', false);
}

export function scrollToCrimes(get: Get, actions: Actions) {
  const piece = pieceById(idFromPath(get('path')));
  let fullScreenHeight = getFullScreenSize(piece, get('browser'))[1];
  scroll.scrollElementTo(
    'scroll',
    fullScreenHeight + 48,
    actions.scrollingDone
  );
  return get().set('seeCrimesShown', false).set('scrollPromptDismissed', true);
}

export function stripeDialogRequested(get: Get, actions: Actions) {
  return get().set('stripeDialogRequested', true);
}

export function stripeDialogShown(get: Get, actions: Actions) {
  return get().set('stripeDialogShown', true);
}

export function stripeDialogHidden(get: Get, actions: Actions) {
  return get()
    .set('stripeDialogShown', false)
    .set('stripeDialogRequested', false);
}

export function purchaseCompleted(get: Get, actions: Actions) {
  setTimeout(actions.requestSoldUpdate, 1000);
}

function keyBy(key, list) {
  const res = {};
  list.forEach((el) => {
    res[el[key]] = el;
  });
  return mutatis(res);
}

/* global alert */

export function fetchOrders(get: Get, actions: Actions, before = null) {
  if (get('ordersLoading')) return;
  superagent.get(
    `${config.API_URL}/orders`,
    {
      status: get('orderStatus'),
      before: before,
    },
    (err, res) => {
      if (err) return alert(err);
      actions.updateOrders(res.body.orders);
    }
  );
  return get().set('ordersLoading', true);
}

export function updateOrders(get: Get, actions: Actions, orders) {
  return get()
    .set('orders', {...get('orders'), ...keyBy('id', orders)})
    .remove('ordersLoading');
}

export function chargeOrder(get: Get, actions: Actions, orderID, customerID) {
  superagent
    .post(`${config.API_URL}/charge`)
    .query({orderID, customerID})
    .end((err, res) => actions.orderCharged(orderID, err, res));
  return get().set(`orders.${orderID}.status`, 'charging');
}

export function orderCharged(get: Get, actions: Actions, orderID, err, res) {
  if (err || !res.body.success) {
    err && alert(err);
    return get().set(`orders.${orderID}.status`, 'failed');
  }
  return get().set(`orders.${orderID}.status`, 'paid');
}

export function shipOrder(get: Get, actions: Actions, orderID, trackingNumber) {
  superagent
    .post(`${config.API_URL}/ship`)
    .query({orderID, trackingNumber})
    .end((err, res) => actions.orderShipped(orderID, trackingNumber, err, res));
  return get().set(`orders.${orderID}.status`, 'shipping');
}

export function orderShipped(
  get,
  actions: Actions,
  orderID,
  trackingNumber,
  err,
  res
) {
  if (err) {
    alert(err);
    return get().remove(`orders.${orderID}.status`, 'paid');
  }
  return get()
    .set(`orders.${orderID}.metadata.tracking_number`, trackingNumber)
    .set(`orders.${orderID}.status`, 'fulfilled');
}

export function selectOrders(get: Get, actions: Actions, status) {
  setTimeout(actions.fetchOrders, 0);
  return get().set('orders', {}).set('orderStatus', status);
}

type UncurriedAction<Action> = Action extends (
  get: any,
  actions: any,
  ...args: infer Args
) => infer ReturnValue
  ? (...args: Args) => ReturnValue
  : void;

export type Get = {
  <Value>(key?: string, defaultValue?: Value, subscriber?: () => void): unknown;
  subscribe(f: () => void): void;
  unsubscribe(f: () => void): void;
};

export type Actions = {
  init: UncurriedAction<typeof init>;
  clientInit: UncurriedAction<typeof clientInit>;
  browserResize: UncurriedAction<typeof browserResize>;
  detectWebP: UncurriedAction<typeof detectWebP>;
  show: UncurriedAction<typeof show>;
  keyDown: UncurriedAction<typeof keyDown>;
  requestSoldUpdate: UncurriedAction<typeof requestSoldUpdate>;
  showScrollPrompt: UncurriedAction<typeof showScrollPrompt>;
  scrollingDone: UncurriedAction<typeof scrollingDone>;
  expandStarted: UncurriedAction<typeof expandStarted>;
  collapseStarted: UncurriedAction<typeof collapseStarted>;
  collapseEnded: UncurriedAction<typeof collapseEnded>;
  cancelScrollPrompt: UncurriedAction<typeof cancelScrollPrompt>;
  navigate: UncurriedAction<typeof navigate>;
  purchaseCompleted: UncurriedAction<typeof purchaseCompleted>;
  keyBy: UncurriedAction<typeof keyBy>;
  fetchOrders: UncurriedAction<typeof fetchOrders>;
  updateOrders: UncurriedAction<typeof updateOrders>;
  chargeOrder: UncurriedAction<typeof chargeOrder>;
  orderCharged: UncurriedAction<typeof orderCharged>;
  shipOrder: UncurriedAction<typeof shipOrder>;
  orderShipped: UncurriedAction<typeof orderShipped>;
  selectOrders: UncurriedAction<typeof selectOrders>;
};
