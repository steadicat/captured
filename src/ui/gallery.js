import React from 'react';
import component from '../lib/component';
import {Block} from 'stylistic-elements';
import {Image} from '../ui/image';
import {Column} from '../ui/layout';
import {linear} from '../lib/math';
import data from '../data';

function columns(width) {
  return Math.round(linear(320, 2, 1800, 6, width));
}

function gutter(width) {
  return 24;
}

function margins(width) {
  return width < 760 ? 24 : 48;
}

function columnWidth(width) {
  const n = columns(width);
  return Math.round(((width - 2 * margins(width)) - (n - 1) * gutter(width)) / n);
}

function minIndex(list) {
  let minValue = Infinity;
  let min = -1;
  for (let i = 0; i < list.length; i++) {
    if (list[i] < minValue) {
      minValue = list[i];
      min = i;
    }
  };
  return min;
}

function toColumns(pieces, width) {
  const n = columns(width);
  const result = new Array(n);
  const heights = new Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = [];
    heights[i] = 0;
  }
  const w = columnWidth(width);
  const g = gutter(width);
  for (let piece of pieces) {
    const shortest = minIndex(heights);
    heights[shortest] += w * piece.size[1] / piece.size[0] + g;
    result[shortest].push(piece);
  }
  return result;
}

export const Gallery = component('Gallery', ({get}) =>
  <Block paddingLeft={margins(get('browser.width')) - gutter(get('browser.width')) / 2} textAlign="left">
    {toColumns(data, get('browser.width')).map((column, i) =>
      <Column
        key={i}
        width={columnWidth(get('browser.width'))}
        marginLeft={gutter(get('browser.width')) / 2}
        marginRight={gutter(get('browser.width')) / 2}>
        {column.map(piece =>
          <Thumbnail
            key={piece.id}
            piece={piece}
          />)}
      </Column>)}
  </Block>
);


export const Thumbnail = component('Thumbnail', ({piece, get, ...props}) =>
  <Image
    src={`${piece.id}.jpg`}
    display="block"
    pxWidth={columnWidth(get('browser.width'))}
    pxHeight={Math.round(columnWidth(get('browser.width')) * piece.size[1] / piece.size[0])}
    width="100%"
    height={Math.round(columnWidth(get('browser.width')) * piece.size[1] / piece.size[0])}
    marginBottom={gutter(get('browser.width'))}
    {...props}
  />
);
