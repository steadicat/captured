import sha1 from 'sha1';
import mutatis from 'mutatis';
import superagent from 'superagent';
import config from '../etc/config';
import * as webp from './lib/webp';
import throttle from './lib/throttle';
import * as scroll from './lib/scroll';
import * as history from './lib/history';
import * as tracking from './lib/tracking';

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

/* global window, document, setInterval, setTimeout */

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
  window.addEventListener('resize', throttle(actions.browserResize));
  window.addEventListener('scroll', throttle(actions.browserScroll));
  history.onChange(actions.navigate);
  tracking.init();

  return get()
    .set('shown', shown)
    .set('browser.pixelRatio', window.devicePixelRatio || 1)
    .set('browser.known', true)
    .set('needsScroll', get('path') !== '/');
}

export function browserResize(get, actions) {
  return get()
    .set('browser.width', document.body.clientWidth)
    .set('browser.height', window.innerHeight);
}

/*
function getDistance({top, bottom}, point) {
  return Math.abs((top + bottom) / 2 - point);
}
*/

export function browserScroll(get, actions) {
  return;
  /*
  if (get('scrolling')) return get().set('needsScroll', false);

  // Find closest element on screen and navigate to it if necessary
  let path = get('path');
  const positions = get('positions');
  const scrollCenter = scroll.getScroll() + get('browser.height') / 2;
  const [closestKey] = Object.keys(positions).reduce(([closest, dist], key) => {
    const newDist = getDistance(positions[key], scrollCenter);
    return newDist < dist ? [key, newDist] : [closest, dist];
  }, [null, Infinity]);
  if (closestKey !== null) {
    const p = closestKey.length ? `/${closestKey}` : '/';
    if (p !== get('path')) {
      history.replaceState(p);
      path = p;
    }
  }

  return get()
    .set('path', path)
    .set('needsScroll', false);
  */
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
  if (get('needsScroll') && (get('path') === `/${id}/`)) {
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

/*
export function navigate(get, actions, path) {
  console.log('navigate', path);
  const bits = path.split('/');
  if (bits.length === 3 && bits[0] === '' && bits[1] === 'unlock' && sha1(bits[2]) === config.UNLOCK_KEY) {
    actions.show();
  }
  return get().set('path', path);
}*/

import {getThumbnailSize, getFullScreenSize} from './ui/gallery';
import data from './data';

export function navigate(get, actions, path) {
  const id = path.substring(1, path.length);
  const position = get('positions')[id];
  if (position && (id !== '')) {
    const browser = get('browser');
    const piece = data.find(p => p.id === id);
    scroll.scrollTo(position.top + getThumbnailSize(piece, browser)[1] / 2 - getFullScreenSize(piece, browser)[1] / 2, actions.scrollingDone);
  }
  return get().set('scrolling', true).set('path', path);
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
