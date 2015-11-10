const blinkTest = /WebKit\/537\.36/g;

export function detectSupport(userAgent, callback) {
  if (blinkTest.test(userAgent)) return callback(true);

  // http://stackoverflow.com/questions/5573096/detecting-webp-support
  /* global Image */
  const webP = new Image();
  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  webP.onload = webP.onerror = function () {
    callback(webP.height === 2);
  };
};
