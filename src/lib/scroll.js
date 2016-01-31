import rebound from 'rebound';
/* global window */

const springSystem = new rebound.SpringSystem();
const scrollSpring = springSystem.createSpring(500, 50);
scrollSpring
  .setRestSpeedThreshold(2)
  .setRestDisplacementThreshold(2);

let lastSet = null;
let scrollEventsFiredElsewhere = 0;

scrollSpring.addListener({
  onSpringUpdate: () => {
    const current = Math.round(scrollSpring.getCurrentValue());
    lastSet = current;
    window.scrollTo(0, Math.round(current));
  },
  onSpringAtRest: () => {
    callback && callback();
    callback = null;
    lastSet = null;
    scrollEventsFiredElsewhere = 0;
  },
});


(typeof window !== 'undefined') && window.addEventListener('scroll', function() {
  const actual = getScroll();
  if ((lastSet !== null) && (lastSet !== actual)) {
    scrollEventsFiredElsewhere++;
    // We skip the first one which is probably the browser scrolling on load
    if (scrollEventsFiredElsewhere === 2) {
      // User interrupted scroll animation
      scrollSpring.setEndValue(actual).setAtRest();
    }
  }
});

export function getScroll() {
  return window.scrollY;
}

let callback;

export function scrollTo(y, cb, animated = true) {
  callback = cb;
  scrollSpring.setCurrentValue(getScroll());
  scrollSpring.setEndValue(y);
}
