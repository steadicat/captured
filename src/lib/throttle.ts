/* global setTimeout */
import raf from 'raf';

export default function throttle(f, delay = 0) {
  let timeout;
  let self;
  let args;
  return function() {
    self = this;
    args = arguments;
    if (timeout) return;
    timeout = (delay ? setTimeout : raf)(function() {
      timeout = null;
      f.apply(self, args);
    }, delay);
  };
}
