import {Arrow, Link, TextLink} from '../ui/core';
import {Block, Inline, InlineBlock, ResetElement} from '../stylistic-elements';
import {
  BoldSmallCaps,
  CondensedText,
  LightCondensedText,
  PageHeading,
  Text
} from '../ui/type';
import {Column, ResponsiveColumn} from '../ui/layout';
import {getOriginalSize, getSize} from '../ui/gallerylayout';

import {Animate} from '../react-rebound';
import {Image} from '../ui/image';
import React from 'react';
import {Zoom} from '../ui/zoom';
import component from '../lib/component';
import {getPieceMargin} from '../ui/gallerylayout';
import {track} from '../lib/behaviors';

export const ReferencesLink = component(
  'ReferencesLink',
  ({get, piece, ...props}) => (
    <BoldSmallCaps>
      <TextLink href={`/${piece.id}/references`} display="block" {...props}>
        References
      </TextLink>
    </BoldSmallCaps>
  )
);

export const ContactLink = component(
  'ReferencesLink',
  ({get, piece, ...props}) => (
    <BoldSmallCaps>
      <TextLink
        target="_blank"
        href={
          piece.artistContact ? `/${piece.id}/contact` : piece.artistContactLink
        }
        display="block"
        {...props}
      >
        Contact the Artist
      </TextLink>
    </BoldSmallCaps>
  )
);

export const Charges = component('Charges', ({get, charges, ...props}) => (
  <ResetElement tag="ul" listStyleType="none" {...props}>
    {charges.map((c, i) => (
      <ResetElement tag="li" key={i} marginTop={24}>
        <Text fontWeight="bold">{c.title || c}</Text>
        {c.description && <Text>{c.description}</Text>}
      </ResetElement>
    ))}
  </ResetElement>
));

export const Piece = track(
  component('Piece', ({get, actions, piece, ...props}) => (
    <Block {...props}>
      <Link href="/">
        <Zoom
          width={getSize(piece, true, get('browser'))[0]}
          height={getSize(piece, true, get('browser'))[1]}
          pxWidth={getSize(piece, !get('expanding'), get('browser'))[0]}
          pxHeight={getSize(piece, !get('expanding'), get('browser'))[1]}
          originalWidth={getOriginalSize(piece, get('browser'))[0]}
          originalHeight={getOriginalSize(piece, get('browser'))[1]}
        >
          <Image
            src={`${piece.image || piece.id}.jpg`}
            translateX="-50%"
            position="relative"
            left="50%"
            display="block"
            visibility={get('expanding') ? 'hidden' : 'visible'}
          />
        </Zoom>
      </Link>
      <Animate opacity={get('seeCrimesShown') ? 1 : 0}>
        <CondensedText
          position="absolute"
          cursor="pointer"
          top={getSize(piece, true, get('browser'))[1] - 80}
          left="50%"
          translateX="-50%"
          color="#fff"
          textAlign="center"
          fontSize={18}
          opacity={0}
          onClick={actions.scrollToCrimes}
          pointerEvents={get('seeCrimesShown') ? null : 'none'}
        >
          <Image
            src="shadow2.png"
            width={634 / 2}
            height={254 / 2}
            position="absolute"
            top="50%"
            left="50%"
            translateX="-50%"
            translateY="-50%"
          />
          <Inline display="block" position="relative" whiteSpace="nowrap">
            Scroll to see the crimes
            <Arrow
              display="block"
              marginTop={0}
              marginLeft="auto"
              marginRight="auto"
            />
          </Inline>
        </CondensedText>
      </Animate>
      <Block
        marginLeft={getPieceMargin(get('browser.width'))}
        marginRight={getPieceMargin(get('browser.width'))}
      >
        <Text
          textAlign="center"
          marginTop={12}
          marginBottom={48}
          fontStyle="italic"
        >
          Materials: {piece.materials}.
        </Text>
        <ResponsiveColumn
          width="50%"
          textAlign={get('browser.mobile') ? 'left' : 'right'}
          paddingRight={get('browser.mobile') ? 0 : 36}
          borderRightStyle="solid"
          borderRightColor="#444"
          borderRightWidth={get('browser.mobile') ? 0 : 1}
        >
          <LightCondensedText fontSize={24} textTransform="uppercase">
            {piece.title} of {piece.company}
          </LightCondensedText>
          <PageHeading marginTop={6}>{piece.name}</PageHeading>
          <Text marginTop={6}>
            {piece.former
              ? 'Oversaw'
              : piece.id === 'koch'
              ? 'Oversee'
              : 'Oversees'}{' '}
            a company engaged in:
          </Text>
          <Charges charge={piece} charges={piece.charges} marginTop={24} />
          {get('browser.mobile') && (
            <ReferencesLink piece={piece} marginTop={24} marginBottom={48} />
          )}
        </ResponsiveColumn>
        <ResponsiveColumn
          textAlign="left"
          width="50%"
          paddingLeft={get('browser.mobile') ? 0 : 36}
        >
          <LightCondensedText fontSize={24} textTransform="uppercase">
            Captured by
          </LightCondensedText>
          <PageHeading marginTop={6}>
            {piece.artist}{' '}
            {!get('browser.mobile') && (
              <InlineBlock
                tag="span"
                whiteSpace="nowrap"
                verticalAlign="baseline"
              >
                (Prison ID #{piece.artistPrisonID})
              </InlineBlock>
            )}
          </PageHeading>
          <Text marginTop={6}>Serving {piece.artistSentence} for:</Text>
          <Charges
            charge={piece}
            charges={piece.artistCharges}
            textAlign="left"
            marginTop={24}
          />
          {get('browser.mobile') && (
            <ContactLink piece={piece} marginTop={24} />
          )}
        </ResponsiveColumn>
        {!get('browser.mobile') && (
          <Column
            width="50%"
            paddingRight={36}
            paddingTop={36}
            textAlign="right"
            borderRightStyle="solid"
            borderRightColor="#444"
            borderRightWidth={1}
          >
            <ReferencesLink piece={piece} />
          </Column>
        )}
        {!get('browser.mobile') && (
          <Column textAlign="left" width="50%" paddingTop={36} paddingLeft={36}>
            <ContactLink piece={piece} />
          </Column>
        )}
      </Block>
    </Block>
  ))
);
