import React from 'react';
import {Block, Inline} from 'stylistic-elements';
import component from '../lib/component';
import {track} from '../lib/behaviors';
import {Image} from '../ui/image';
import {Column, ResponsiveColumn} from '../ui/layout';
import {Link} from '../ui/core';
import {Text, LightCondensedText, PageHeading} from '../ui/type';

export const Charges = component('Charges', ({get, charges, ...props}) =>
  <Block {...props}>
    {charges.map((c, i) =>
      <Block key={i} marginTop={get('browser.width') > 740 ? 24 : 6}>
        <Text fontWeight="bold">{c.title}</Text>
        {get('browser.width') > 740 && <Text>{c.description}.</Text>}
      </Block>
    )}
  </Block>
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
  <Block maxWidth={get('browser.height')} {...props}>
    <Image
      src={`${piece.id}.jpg`}
      pxWidth={getImageSize(get)[0]}
      pxHeight={getImageSize(get)[1]}
      width={get('browser.known') ? getImageSize(get)[0] : '100%'}
      height={get('browser.known') ? getImageSize(get)[1] : null}
      maxWidth="100vh"
      marginBottom={24}
    />

    <ResponsiveColumn textAlign="left" width="60%" paddingRight={24}>
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
      {get('browser.width') < 740 && <Link display="block" paddingBottom={24} fontWeight="bold" textAlign="left">References</Link>}
    </ResponsiveColumn>
    <ResponsiveColumn textAlign="left" width="40%">
      <LightCondensedText fontSize={24} textTransform="uppercase">Captured by</LightCondensedText>
      <PageHeading marginTop={6}>
        {piece.artist}
      </PageHeading>
      <Text marginTop={6}>Serving {piece.artistSentence} for:</Text>
      <Text marginTop={24}><Inline fontWeight="bold">{piece.artistCharges}</Inline></Text>
      {get('browser.width') < 740 && <Link display="block" paddingTop={24} fontWeight="bold" textAlign="left">Contact Info</Link>}
    </ResponsiveColumn>
    {get('browser.width') > 740 && <Column textAlign="left" width="60%" paddingRight={24}>
      <Link display="block" fontWeight="bold" textAlign="left">References</Link>
    </Column>}
    {get('browser.width') > 740 && <Column textAlign="left" width="40%">
      <Link display="block" fontWeight="bold" textAlign="left">Contact Info</Link>
      <Text textAlign="left" marginTop={24}>Materials: {piece.materials}.</Text>
    </Column>}

  </Block>
));
