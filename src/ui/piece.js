import React from 'react';
import {Block, InlineBlock, Inline} from 'stylistic-elements';
import component from '../lib/component';
import {track} from '../lib/behaviors';
import {Image} from '../ui/image';
import {Column} from '../ui/layout';
import {Link} from '../ui/core';
import {Text, LightCondensedText, PageHeading} from '../ui/type';
import {SocialButtons} from '../ui/social';

export const Charges = component('Charges', ({charges, ...props}) =>
  <Block {...props}>
    {charges.map((c, i) =>
      <Block key={i} marginTop={24}>
        <Text fontWeight="bold">{c.title}</Text>
        <Text>{c.description}.</Text>
      </Block>
    )}
  </Block>
);

function getImageSize(get) {
  return Math.ceil(Math.min(get('browser.width') * 0.8, get('browser.height')));
}

export const Piece = track(component('Piece', ({get, piece, ...props}) =>
  <Block maxWidth={get('browser.height')} {...props}>
    <Image
      src={`${piece.image}.jpg`}
      pxWidth={getImageSize(get)}
      pxHeight={getImageSize(get)}
      width={get('browser.known') ? getImageSize(get) : '100%'}
      height={get('browser.known') ? getImageSize(get) : null}
      maxWidth="100vh"
      marginBottom={24}
    />

    <Column textAlign="left" width="60%" paddingRight={24}>
      {/*<SocialButtons display="block" textAlign="right" url={`https://thecapturedproject.com/${piece.id}/`} />*/}
      <LightCondensedText fontSize={24} textTransform="uppercase">
        {piece.company}
      </LightCondensedText>
      <PageHeading marginTop={6}>
        {piece.name}, {piece.title}
      </PageHeading>
      <Text marginTop={6}>Oversees a company engaged in:</Text>
      <Charges
        charge={piece}
        charges={piece.charges}
        textAlign="left"
        marginBottom={24}
      />
    </Column>
    <Column textAlign="left" width="40%">
      <LightCondensedText fontSize={24} textTransform="uppercase">Captured by</LightCondensedText>
      <PageHeading marginTop={6}>
        {piece.artist}
      </PageHeading>
      <Text marginTop={6}>Prison ID# {piece.artistID}</Text>
      <Text marginTop={24}>{piece.artistBio} <Inline fontWeight="bold">{piece.artistCharges}</Inline>.</Text>
      <Text marginTop={24}>{piece.materials}</Text>
    </Column>
    <Link display="block" paddingRight={4} fontWeight="bold" textAlign="left">More Info</Link>
    <InlineBlock display="none">
      {(piece.links || []).map((link, i) =>
      <Link key={i} href={link} fontWeight="normal" paddingLeft={4} paddingRight={4}>{i + 1}</Link>
    )}
    </InlineBlock>
  </Block>
));
