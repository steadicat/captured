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

export const Thumbnail = component('Thumbnail', ({piece, get, ...props}) =>
  <Image
    src={`${piece.id}.jpg`}
    pxWidth={260}
    pxHeight={Math.round(260 * piece.size[1] / piece.size[0])}
    width={get('browser.known') ? 260 : '100%'}
    height={get('browser.known') ? Math.round(260 * piece.size[1] / piece.size[0]) : null}
    maxWidth="100vh"
    marginBottom={24}
    marginLeft={24}
    marginRight={24}
    verticalAlign="top"
    {...props}
  />
);
