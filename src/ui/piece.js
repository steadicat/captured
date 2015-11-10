import React from 'react';
import {Block, InlineBlock} from 'stylistic-elements';
import component from '../lib/component';
import {track} from '../lib/behaviors';
import {Image} from '../ui/image';
import {Column} from '../ui/layout';
import {Link} from '../ui/core';
import {Text, LightCondensedText, PageHeading} from '../ui/type';
import {SocialButtons} from '../ui/social';

export const Charges = component('Charges', ({charges, ...props}) =>
  <Block {...props}>
    <Column width="50%" paddingRight={6}>
      {charges.slice(0, Math.ceil(charges.length / 2)).map((c, i) =>
        <Block key={i} marginTop={24}>
          <Text fontWeight="bold">{c.title}</Text>
          <Text>{c.description}.</Text>
        </Block>
      )}
    </Column>
    <Column width="50%" paddingLeft={6}>
      {charges.slice(Math.ceil(charges.length / 2)).map((c, i) =>
        <Block key={i} marginTop={24}>
          <Text fontWeight="bold">{c.title}</Text>
          <Text>{c.description}.</Text>
        </Block>
      )}
    </Column>
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
    />
    <Block marginTop={36} textAlign="center">
      {/*<SocialButtons display="block" textAlign="right" url={`https://thecapturedproject.com/${piece.id}/`} />*/}
      <PageHeading marginTop={24} marginBottom={12}>
        {piece.name}, {piece.title} of {piece.company}
      </PageHeading>
      <Charges
        charge={piece}
        charges={piece.charges}
        textAlign="left"
        marginBottom={24}
      />
      <Block fontSize={14}>
        <InlineBlock paddingRight={4} fontWeight="bold">More info:</InlineBlock>
        <InlineBlock>
          {(piece.links || []).map((link, i) =>
          <Link key={i} href={link} fontWeight="normal" paddingLeft={4} paddingRight={4}>{i + 1}</Link>
        )}
        </InlineBlock>
      </Block>
      <LightCondensedText
        marginTop={28}
        marginBottom={6}
        fontSize={20}
        textTransform="uppercase">
          Captured by
        </LightCondensedText>
      <PageHeading marginBottom={6} fontSize={20}>
        {piece.artist}, prison ID# {piece.artistID}
      </PageHeading>
      <Text>{piece.artistBio} {piece.artistCharges}</Text>
      <Text marginTop={48}>{piece.materials}</Text>
    </Block>
  </Block>
));
