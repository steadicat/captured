import React from 'react';
import {Block, Inline, ResetElement} from 'stylistic-elements';
import component from '../lib/component';
import {track} from '../lib/behaviors';
import {Image} from '../ui/image';
import {Column, ResponsiveColumn} from '../ui/layout';
import {TextLink} from '../ui/core';
import {Text, LightCondensedText, PageHeading} from '../ui/type';

export const Charges = component('Charges', ({get, charges, ...props}) =>
  <ResetElement tag="ul" {...props}>
    {charges.map((c, i) =>
      <ResetElement tag="li" key={i} marginTop={get('browser.width') > 740 ? 24 : 6}>
        <Text fontWeight="bold">{c.title || c}</Text>
        {c.description && get('browser.width') > 740 && <Text>{c.description}.</Text>}
      </ResetElement>
    )}
  </ResetElement>
);

function getImageSize(get) {
  const browser = get('browser');
  const maxWidth = browser.width * 0.8;
  const maxAspectRatio = 0.7;
  const width = Math.min(maxWidth, browser.height);
  const height = Math.min(browser.height, width / maxAspectRatio);
  return [width, height].map(Math.ceil);
}

export const Piece = track(component('Piece', ({get, piece, ...props}) =>
  <Block {...props}>
    {/*
    <Image
      src={`${piece.id}.jpg`}
      pxWidth={getImageSize(get)[0]}
      pxHeight={getImageSize(get)[1]}
      width={get('browser.known') ? getImageSize(get)[0] : '100%'}
      height={get('browser.known') ? getImageSize(get)[1] : null}
      maxWidth="100vh"
      marginBottom={24}
    />*/}

    <Text textAlign="center" marginTop={12} marginBottom={48} fontStyle="italic">Materials: {piece.materials}.</Text>

    <ResponsiveColumn textAlign="left" width="60%" paddingRight={48}>
      {/*<SocialButtons display="block" textAlign="right" url={`https://thecapturedproject.com/${piece.id}/`} />*/}
      <LightCondensedText fontSize={24} textTransform="uppercase">
        {piece.title} of {piece.company}
      </LightCondensedText>
      <PageHeading marginTop={6}>
        {piece.name}
      </PageHeading>
      <Text marginTop={6}>Oversees a company engaged in:</Text>
      <Charges
        charge={piece}
        charges={piece.charges}
        textAlign="left"
        marginBottom={24}
      />
      {get('browser.width') < 740 && <TextLink display="block" paddingBottom={24} fontWeight="bold" textAlign="left">References</TextLink>}
    </ResponsiveColumn>
    <ResponsiveColumn textAlign="left" width="40%">
      <LightCondensedText fontSize={24} textTransform="uppercase">Captured by</LightCondensedText>
      <PageHeading marginTop={6}>
        {piece.artist}
      </PageHeading>
      <Text marginTop={6}>Serving {piece.artistSentence} for:</Text>
      <Charges
        charge={piece}
        charges={piece.artistCharges}
        textAlign="left"
        marginBottom={24}
      />
      {get('browser.width') < 740 && <TextLink display="block" paddingTop={24} fontWeight="bold" textAlign="left">Contact Info</TextLink>}
    </ResponsiveColumn>
    {get('browser.width') > 740 && <Column textAlign="left" width="60%" paddingRight={24}>
      <TextLink
        href={`/${piece.id}/references`}
        fontWeight="bold"
        textAlign="left">
        References
      </TextLink>
    </Column>}
    {get('browser.width') > 740 && <Column textAlign="left" width="40%">
      <TextLink
        href={`/${piece.id}/contact`}
        fontWeight="bold"
        textAlign="left">
        Contact Info
      </TextLink>
    </Column>}

  </Block>
));
