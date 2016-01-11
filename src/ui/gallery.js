import React from 'react';
import {Animate} from 'react-rebound';
import {Block} from 'stylistic-elements';
import component from '../lib/component';
import {hover, track} from '../lib/behaviors';
import {Link} from '../ui/core';
import {Image} from '../ui/image';
import {Column} from '../ui/layout';
import {Text} from '../ui/type';
import {Piece} from '../ui/piece';
import {linear} from '../lib/math';
import data from '../data';

function columns(width) {
  return Math.round(linear(320, 2, 1800, 6, width));
}

function gutter(width) {
  return width < 760 ? 12 : 24;
}

function margins(width) {
  return width < 760 ? 12 : 48;
}

function chinHeight(width) {
  return width < 760 ? 112 : 72;
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
    heights[shortest] += w * piece.size[1] / piece.size[0] + chinHeight(width) + g;
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
            trackKey={piece.id}
            piece={piece}
            current={'/' + piece.id === get('path')}
            x={(columnWidth(get('browser.width')) * (i + 0.5) + gutter(get('browser.width')) * i) + margins(get('browser.width'))}
            y={get(`positions.${piece.id}.top`)}
          />)}
      </Column>)}
    <Animate opacity={get('path') === '/' ? 0 : 1}>
      <Block
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="#fff"
        opacity={0}
        pointerEvents={get('path') === '/' ? 'none' : null}
        zIndex={1}
      />
    </Animate>
    {data.filter(piece => '/' + piece.id === get('path')).map(piece =>
      <Animate key={piece.id} opacity={1}>
        <Piece
          piece={piece}
          position="absolute"
          zIndex={4}
          opacity={0}
          top={get(`positions.${piece.id}.top`) + getThumbnailSize(piece, get('browser'))[1] / 2 + getFullScreenSize(piece, get('browser'))[1] / 2}
          left={40}
          right={40}
        />
      </Animate>)}
  </Block>
);

export function getThumbnailSize(piece, {width, height}) {
  const imageRatio = piece.size[0] / piece.size[1];
  return [columnWidth(width), Math.round(columnWidth(width) / imageRatio)];
}

export function getFullScreenSize(piece, {width, height}) {
  const screenRatio = width / height;
  const imageRatio = piece.size[0] / piece.size[1];
  const fullScreenWidth = imageRatio > screenRatio ? width : (height * imageRatio);
  return [Math.round(fullScreenWidth), Math.round(fullScreenWidth / imageRatio)];
}

function getSize(piece, current, {width, height}) {
  return (current ? getFullScreenSize : getThumbnailSize)(piece, {width, height});
}

function getScale(piece, current, hovered, {width, height}) {
  if (current) {
    const [fullScreenWidth] = getFullScreenSize(piece, {width, height});
    return fullScreenWidth / columnWidth(width);
  }
  return hovered ? 1.05 : 1;
}

export const Thumbnail = track(hover(component('Thumbnail', ({piece, x, y, get, current, hovered, ...props}) =>
  <Link
    href={current ? '/' : `/${piece.id}`}
    marginBottom={gutter(get('browser.width'))}
    fontWeight="normal"
    display="block">
    <Animate
      scaleX={getScale(piece, current, hovered, get('browser'))}
      scaleY={getScale(piece, current, hovered, get('browser'))}
      translateX={current ? (get('browser.width') / 2 - x) : 0}>
      {animating => <Image
        src={`${piece.id}.jpg`}
        display="block"
        pxWidth={getSize(piece, current, get('browser'))[0]}
        pxHeight={getSize(piece, current, get('browser'))[1]}
        width={getThumbnailSize(piece, get('browser'))[0]}
        height={getThumbnailSize(piece, get('browser'))[1]}
        position="relative"
        zIndex={current ? 3 : (animating ? 2 : 0)}
        {...props}
      />}
    </Animate>
    <Block height={chinHeight(get('browser.height'))} fontSize={12} lineHeight={20} marginTop={12}>
      <Text fontWeight="bold">{piece.title} of {piece.company}</Text>
      <Text>by {piece.artist}, Prison ID# {piece.artistPrisonID}</Text>
      <Text fontStyle="italic">{piece.materials}</Text>
    </Block>
  </Link>
)));
