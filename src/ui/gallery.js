import React from 'react';
import component from '../lib/component';
import {Block} from 'stylistic-elements';
import {Image} from '../ui/image';
import data from '../data';

export const Gallery = component('Gallery', ({}) =>
  <Block>
    {data.map((piece, i) =>
      <Thumbnail
        key={piece.id}
        piece={piece}
      />)}
  </Block>
);

function getImageSize(get) {
  return [260, 260];
}

export const Thumbnail = component('Thumbnail', ({piece, get, ...props}) =>
  <Image
    src={`${piece.id}.jpg`}
    pxWidth={getImageSize(get)[0]}
    pxHeight={getImageSize(get)[1]}
    width={get('browser.known') ? getImageSize(get)[0] : '100%'}
    height={get('browser.known') ? getImageSize(get)[1] : null}
    maxWidth="100vh"
    marginBottom={24}
    marginLeft={24}
    marginRight={24}
    {...props}
  />
);
