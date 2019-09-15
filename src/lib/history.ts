/* global window */

export function pushState(path) {
  window.history && window.history.pushState({}, null, path);
}

export function replaceState(path) {
  window.history && window.history.replaceState({}, null, path);
}

const listeners = [];

(typeof window !== 'undefined') && window.addEventListener('popstate', function() {
  for (let i = 0, l = listeners.length; i < l; i++) {
    listeners[i](window.location.pathname);
  }
});

export function onChange(listener) {
  listeners.push(listener);
}
