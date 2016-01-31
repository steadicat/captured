import React from 'react';
import {Animate} from 'react-rebound';
import {Block, InlineBlock} from 'stylistic-elements';
import component from '../lib/component';
import {hover, track} from '../lib/behaviors';
import {Link, TextLink, Close, Modal} from '../ui/core';
import {Image} from '../ui/image';
import {Column} from '../ui/layout';
import {Text, LightCondensedText} from '../ui/type';
import {Piece} from '../ui/piece';
import {margins, gutter, chinHeight, toColumns, columnWidth, isCurrent, isExpanded, getThumbnailSize, getPieceMargin, getScale, getCurrentPiece, isReferences, isContact} from '../ui/gallerylayout';
import {trimPathEnd, humanizeLink} from '../lib/strings';
import {linear} from '../lib/math';
import data from '../data';

function getPrefaceSize(get) {
  return linear(320, 18, 2000, 56, Math.min(get('browser.width'), get('browser.height') * 1.4));
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
            current={isCurrent(get('path'), piece)}
            x={(columnWidth(get('browser.width')) * (i + 0.5) + gutter(get('browser.width')) * i) + margins(get('browser.width'))}
            y={get(`positions.${piece.id}.top`)}
          />)}
      </Column>)}
    <Animate opacity={isExpanded(get('path')) ? 1 : 0}>
      <Block
        position="fixed"
        overflow="auto"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="#fff"
        opacity={0}
        pointerEvents={isExpanded(get('path')) ? null : 'none'}
        zIndex={1}>
        {getCurrentPiece(get('path')) && <Piece
          piece={getCurrentPiece(get('path'))}
          position="absolute"
          top={0}
          left={getPieceMargin(get('browser.width'))}
          right={getPieceMargin(get('browser.width'))}
          paddingBottom={96}
        />}
      </Block>
    </Animate>
    {isReferences(get('path')) && <Modal>
      {getCurrentPiece(get('path')).links.map((link, i) =>
        <TextLink
          key={i}
          href={link}
          display="block"
          overflow="hidden"
          position="relative"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          paddingTop={12}
          paddingBottom={12}
          target="_blank">
          {humanizeLink(link)}
        </TextLink>)}
    </Modal>}
    {isContact(get('path')) && <Modal whiteSpace="pre">
      <LightCondensedText lineHeight="2" fontSize={getPrefaceSize(get)}>
        {getCurrentPiece(get('path')).artistContact}
      </LightCondensedText>
    </Modal>}
    {data.filter(piece => isCurrent(get('path'), piece)).map(piece =>
      <Link
        href={trimPathEnd(get('path'))}
        key="close"
        position="fixed"
        zIndex={11}
        top={6}
        left={6}>
        <Close />
      </Link>)}
  </Block>
);

export const Thumbnail = track(hover(component('Thumbnail', ({piece, x, y, get, current, hovered, ...props}) =>
  <Link
    href={current ? '/' : `/${piece.id}`}
    marginBottom={gutter(get('browser.width'))}
    fontWeight="normal"
    display="block"
    {...props}>
    <Animate
      scaleX={getScale(piece, current, hovered, get('browser'))}
      scaleY={getScale(piece, current, hovered, get('browser'))}
      translateX={current ? (get('browser.width') / 2 - x) : 0}
      translateZ={0}>
      {animating => <Image
        src={`${piece.image || piece.id}.jpg`}
        display="block"
        scaleX={1}
        scaleY={1}
        //pxWidth={getSize(piece, current, get('browser'))[0]}
        //pxHeight={getSize(piece, current, get('browser'))[1]}
        width={getThumbnailSize(piece, get('browser'))[0]}
        height={getThumbnailSize(piece, get('browser'))[1]}
        position="relative"
        zIndex={animating ? 2 : 0}
      />}
    </Animate>
    <Block height={chinHeight(get('browser.height'))} fontSize={12} lineHeight={20} marginTop={12}>
      <Text fontWeight="bold">{piece.title} of {piece.company}</Text>
      <Text>by {piece.artist}, <InlineBlock tag="span" whiteSpace="nowrap">prison ID #{piece.artistPrisonID}</InlineBlock></Text>
      <Text fontStyle="italic">{piece.materials}</Text>
    </Block>
  </Link>
)));
