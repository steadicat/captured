import React from 'react';
import {connect, Root} from 'ducts';
import {ResetElement} from 'stylistic-elements';
import config from '../../etc/config';
import component from '../lib/component';
import {Router} from '../ui/home';
import data from '../data';

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
      <script dangerouslySetInnerHTML={{__html: `Captured.init(${inlineJSON(this.props.get(''))});`}} />
    );
  }
}

function getPieceFromPath(path) {
  for (let i = 0, l = data.length; i < l; i++) {
    if (`/${data[i].id}/` === path) {
      return data[i];
    }
  }
}

function getTitle(path) {
  const piece = getPieceFromPath(path);
  if (piece) {
    return `${piece.name}, ${piece.title}: Captured by ${piece.artist}`;
  } else if (path === '/act/') {
    return 'Captured: buy the book or share the project';
  } else {
    return 'Captured: people in prison drawing people who should be';
  }
}

function getDescription(path) {
  const piece = getPieceFromPath(path);
  if (piece) {
    return `${piece.materials}, by ${piece.artist}. ${piece.artistBio} ${piece.artistCharges}.`;
  } else if (path === '/act/') {
    return 'Limited edition of 1000 copies. All proceeds will be donated to the Bernie 2016 campaign.';
  } else {
    return 'See the pictures or buy the book. All proceeds will be donated to the Bernie 2016 campaign.';
  }
}

function getImage(path) {
  const piece = getPieceFromPath(path);
  if (piece) {
    return `${config.IMAGES[piece.image + '.jpg']}=w900-h900-c`;
  } else {
    return `${config.IMAGES[data[0].image + '.jpg']}=w900-h900-c`;
  }
}

function trailingSlash(url) {
  if (/\/$/.test(url)) return url;
  return url + '/';
}

export const Page = component('Page', ({$, store, children}) =>
  <html>
    <head>
      <title>{getTitle($('path'))}</title>
      <link rel="prefetch" href={`${config.ASSETS_URL}${$('main')}`} />
      <link rel="prefetch" href="https://fonts.googleapis.com/css?family=Roboto:300,700|Roboto+Condensed:300,700" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,700|Roboto+Condensed:300,700" type="text/css" />
      <meta name="description" content={getDescription($('path'))} />
      <link rel="canonical" href={trailingSlash(`https://thecapturedproject.com${$('path')}`)} />
      <meta property="og:site_name" content="The Captured Project" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://thecapturedproject.com${$('path')}`} />
      <meta property="og:title" content={getTitle($('path'))} />
      <meta property="og:description" content={getDescription($('path'))} />
      <link rel="image_src" content={getImage($('path'))} />
      <meta property="og:image" content={getImage($('path'))} />
      <meta property="og:image:secure_url" content={getImage($('path'))} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content="797107167075130" />
      <meta property="twitter:site" content="@ProjectCaptured" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={getTitle($('path'))} />
      <meta property="twitter:description" content={getDescription($('path'))} />
      <meta property="twitter:image:src" content={getImage($('path'))} />
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
      {/*<link rel="shortcut icon" href="" type="image/png" />*/}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    </head>
    <ResetElement tag="body">
      {children}
      <script src={`${config.ASSETS_URL}${$('main')}`} />
      <InitScript />
    </ResetElement>
  </html>
);

function inlineJSON(data) {
  return JSON.stringify(data)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .replace(/<\//g, '<\\/');
};
