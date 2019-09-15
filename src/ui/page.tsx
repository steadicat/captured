import {Root, connect} from 'ducts';

import {Body} from '../ui/constrain';
import React from 'react';
import {Router} from '../ui/router';
import component from '../lib/component';
import config from '../../config';
import {getCurrentPiece} from '../ui/gallerylayout';

export function createPage(get, boundActions) {
  return (
    <Root get={get} actions={boundActions}>
      <Page>
        <Router />
      </Page>
    </Root>
  );
}

@connect
class InitScript extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    /* eslint react/no-danger:0 */
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `Captured.init(${inlineJSON(this.props.get(''))});`
        }}
      />
    );
  }
}

function getTitle(path) {
  return 'CAPTURED: People in Prison Drawing People Who Should Be';
}

function getDescription(path) {
  return 'CEOs of the companies destroying our environment, economy, and society, as drawn by incarcerated artists.';
}

function getImage(path) {
  const piece = getCurrentPiece(path);
  if (piece) {
    return `${config.IMAGES[piece.image + '.jpg']}=w1200-h670-c`;
  } else {
    return `${config.IMAGES['koch.jpg']}=w1200-h670-c`;
  }
}

function getOGImages(path) {
  const piece = getCurrentPiece(path);
  if (piece) {
    return (
      <meta
        property="og:image"
        content={`${config.IMAGES[piece.image + '.jpg']}=w1200-h670-c`}
      />
    );
  }

  const images = [];

  ['koch.jpg', 'read.jpg', 'blatter.jpg', 'brabeck-letmathe.jpg'].forEach(
    (image, i) => {
      images.push(
        <meta
          key={i}
          property="og:image"
          content={`${config.IMAGES[image]}=w1200-h670-c`}
        />
      );
    }
  );

  images.push(
    <meta
      key={-1}
      property="og:image"
      content={`${config.IMAGES['share-image.jpg']}=w1200`}
    />
  );

  return images;
}

function trailingSlash(url) {
  if (/\/$/.test(url)) return url;
  return url + '/';
}

export const Page = component('Page', ({$, store, children}) => (
  <html>
    <head>
      <title>{getTitle($('path'))}</title>
      <link
        rel="preload"
        as="script"
        href={`${config.ASSETS_URL}${$('main')}`}
      />
      <link rel="preconnect" href="https://lh3.googleusercontent.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700|Roboto+Condensed:300,300italic,700"
        type="text/css"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin
        href="https://fonts.gstatic.com/s/roboto/v15/Hgo13k-tfSpn0qi1SFdUfZBw1xU1rKptJj_0jans920.woff2"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin
        href="https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOJBw1xU1rKptJj_0jans920.woff2"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin
        href="https://fonts.gstatic.com/s/roboto/v15/7m8l7TlFO-S3VkhHuR0at4gp9Q8gbYrhqGlRav_IXfk.woff2"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin
        href="https://fonts.gstatic.com/s/robotocondensed/v13/b9QBgL0iMZfDSpmcXcE8nCqOJfobX9lrC1wFVe9k15E.woff2"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin
        href="https://fonts.gstatic.com/s/robotocondensed/v13/b9QBgL0iMZfDSpmcXcE8nPX2or14QGUHgbhSBV1Go0E.woff2"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin
        href="https://fonts.gstatic.com/s/robotocondensed/v13/mg0cGfGRUERshzBlvqxeAL8HwCiP7DYII36AlQZXXQeglnMp3_3A8V8Ai8YosRtX.woff2"
      />
      <link
        rel="preload"
        as="script"
        href="https://checkout.stripe.com/checkout.js"
      />
      <meta name="description" content={getDescription($('path'))} />
      <link
        rel="canonical"
        href={trailingSlash(`https://thecapturedproject.com${$('path')}`)}
      />
      <meta property="og:site_name" content="The Captured Project" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://thecapturedproject.com${$('path')}`}
      />
      <meta property="og:title" content={getTitle($('path'))} />
      <meta property="og:description" content={getDescription($('path'))} />
      <link rel="image_src" content={getImage($('path'))} />
      {getOGImages($('path'))}
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content="797107167075130" />
      <meta property="twitter:site" content="@ProjectCaptured" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={getTitle($('path'))} />
      <meta
        property="twitter:description"
        content={getDescription($('path'))}
      />
      <meta property="twitter:image:src" content={getImage($('path'))} />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link
        rel="shortcut icon"
        type="image/png"
        href={config.IMAGES['icon.png']}
      />
      <link
        rel="apple-touch-icon"
        type="image/png"
        href={config.IMAGES['icon.png']}
      />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <style>
        {`@keyframes pulse {0% {transform: translate(0px,0px)}50% {transform: translate(0px,10px)}100% {transform: translate(0px,0px)}}`}
      </style>
    </head>
    <Body>
      {children}
      <script src={`${config.ASSETS_URL}${$('main')}`} />
      <InitScript />
    </Body>
  </html>
));

function inlineJSON(data) {
  return JSON.stringify(data)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .replace(/<\//g, '<\\/');
}
