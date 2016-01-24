import React from 'react';
import {Block, ResetElement} from 'stylistic-elements';
import component from '../lib/component';
import {track} from '../lib/behaviors';
import {Column, ResponsiveColumn} from '../ui/layout';
import {TextLink} from '../ui/core';
import {Text, LightCondensedText, PageHeading} from '../ui/type';

export const Charges = component('Charges', ({get, charges, ...props}) =>
  <ResetElement tag="ul" listStyleType="none" {...props}>
    {charges.reverse().map((c, i) =>
      <ResetElement tag="li" key={i} marginTop={24}>
        <Text fontWeight="bold">{c.title || c}</Text>
        {c.description && <Text>{c.description}.</Text>}
      </ResetElement>
    )}
  </ResetElement>
);

export const Piece = track(component('Piece', ({get, piece, ...props}) =>
  <Block {...props}>
    <Text textAlign="center" marginTop={12} marginBottom={48} fontStyle="italic">Materials: {piece.materials}.</Text>
    <ResponsiveColumn textAlign="left" width="50%" paddingRight={get('browser.width') < 740 ? 12 : 48}>
      {/*<SocialButtons display="block" textAlign="right" url={`https://thecapturedproject.com/${piece.id}/`} />*/}
      <LightCondensedText fontSize={24} textTransform="uppercase">
        {piece.title} of {piece.company}
      </LightCondensedText>
      <PageHeading marginTop={6}>
        {piece.name}
      </PageHeading>
      <Text marginTop={6}>{piece.former ? 'Oversaw' : (piece.id === 'koch' ? 'Oversee' : 'Oversees')} a company engaged in:</Text>
      <Charges
        charge={piece}
        charges={piece.charges}
        textAlign="left"
        marginBottom={24}
      />
      {get('browser.width') < 740 && <TextLink display="block" paddingBottom={24} fontWeight="bold" textAlign="left">References</TextLink>}
    </ResponsiveColumn>
    <ResponsiveColumn textAlign="left" width="50%" paddingLeft={get('browser.width') < 740 ? 12 : 48}>
      <LightCondensedText fontSize={24} textTransform="uppercase">Captured by</LightCondensedText>
      <PageHeading marginTop={6}>
        {piece.artist} {get('browser.width') > 740 && `(Prison\xa0ID\xa0#${piece.artistPrisonID})`}
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
    {get('browser.width') > 740 && <Column textAlign="left" width="50%" paddingRight={24}>
      <TextLink
        href={`/${piece.id}/references`}
        fontWeight="bold"
        textAlign="left">
        References
      </TextLink>
    </Column>}
    {get('browser.width') > 740 && <Column textAlign="left" width="50%">
      <TextLink
        href={`/${piece.id}/contact`}
        fontWeight="bold"
        textAlign="left">
        Contact Info
      </TextLink>
    </Column>}

  </Block>
));
