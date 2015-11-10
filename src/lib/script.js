const loaded = {};

export function load(url, callback) {
  /* global document */
  let script = loaded[url];
  if (!script) {
    script = document.createElement('script');
    script.src = url;
    script.addEventListener('load', () => {
      script.setAttribute('data-loaded', 'true');
      callback && callback();
    });
    loaded[url] = script;
    document.body.appendChild(script);
  } else if (script.getAttribute('data-loaded') === 'true') {
    callback && callback();
  } else {
    script.addEventListener('load', callback);
  }
}
