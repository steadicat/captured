import rebound from 'rebound';
/* global document */

function getScroll(el) {
  return el.scrollTop;
}

function setScroll(el, y) {
  el.scrollTop = Math.round(y);
}

const springSystem = new rebound.SpringSystem();

function createSpring(element) {
  const spring = springSystem.createSpring(500, 50);
  spring
    .setRestSpeedThreshold(2)
    .setRestDisplacementThreshold(2);

  let lastSet = null;
  let scrollEventsFiredElsewhere = 0;

  spring.addListener({
    onSpringUpdate: () => {
      const current = Math.round(spring.getCurrentValue());
      lastSet = current;
      setScroll(element, current);
    },
    onSpringAtRest: () => {
      spring.callback && spring.callback();
      spring.callback = null;
      lastSet = null;
      scrollEventsFiredElsewhere = 0;
    },
  });

  element.addEventListener('scroll', function() {
    const actual = getScroll(element);
    if ((lastSet !== null) && (lastSet !== actual)) {
      scrollEventsFiredElsewhere++;
      // We skip the first one which is probably the browser scrolling on load
      if (scrollEventsFiredElsewhere === 2) {
        // User interrupted scroll animation
        spring.setEndValue(actual).setAtRest();
      }
    }
  });

  return spring;
}

let documentScrollSpring;

if (typeof document !== 'undefined') {
  documentScrollSpring = createSpring(document.body);
}

export function scrollTo(y, cb, animated = true) {
  if (!documentScrollSpring) {
    console.warn('Can\'t scroll without a browser');
    return;
  }
  documentScrollSpring.callback = cb;
  documentScrollSpring.setCurrentValue(document.body.scrollTop);
  documentScrollSpring.setEndValue(y);
}

const springs = [];

export function scrollElementTo(id, y, cb, animated = true) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn('Element to scroll not found');
    return;
  }
  let spring = springs[id];
  if (!springs[id]) spring = springs[id] = createSpring(element);
  spring.callback = cb;
  spring.setCurrentValue(element.scrollTop);
  spring.setEndValue(y);
}
