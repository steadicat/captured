import React from 'react';
import {Block, ResetElement, InlineBlock} from 'stylistic-elements';
import component from '../lib/component';
import {track} from '../lib/behaviors';
import {Column, ResponsiveColumn} from '../ui/layout';
import {TextLink, Link} from '../ui/core';
import {Image} from '../ui/image';
import {Text, LightCondensedText, PageHeading} from '../ui/type';
import {getSize} from '../ui/gallerylayout';

export const Charges = component('Charges', ({get, charges, ...props}) =>
  <ResetElement tag="ul" listStyleType="none" {...props}>
    {charges.map((c, i) =>
      <ResetElement tag="li" key={i} marginTop={24}>
        <Text fontWeight="bold">{c.title || c}</Text>
        {c.description && <Text>{c.description}</Text>}
      </ResetElement>
    )}
  </ResetElement>
);

export const Piece = track(component('Piece', ({get, piece, ...props}) =>
  <Block {...props}>
    <Link href="/">
      <Image
        src={`${piece.image || piece.id}.jpg`}
        width={getSize(piece, true, get('browser'))[0]}
        height={getSize(piece, true, get('browser'))[1]}
        translateX="-50%"
        position="relative"
        left="50%"
        opacity={1}
        display="block"
        visibility={get('needsScroll') || get('scrolling') ? 'hidden' : 'visible'}
      />
    </Link>
    <Text textAlign="center" marginTop={12} marginBottom={48} fontStyle="italic">Materials: {piece.materials}.</Text>
    <ResponsiveColumn
      width="50%"
      textAlign={get('browser.mobile') ? 'left' : 'right'}
      paddingRight={get('browser.mobile') ? 0 : 36}
      borderRightStyle="solid"
      borderRightColor="#444"
      borderRightWidth={get('browser.mobile') ? 0 : 1}>
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
        marginTop={24}
      />
      {get('browser.mobile') && <TextLink
        href={`/${piece.id}/references`}
        display="block"
        marginBottom={48}
        marginTop={24}
        fontWeight="bold"
        textAlign="left">References</TextLink>}
    </ResponsiveColumn>
    <ResponsiveColumn textAlign="left" width="50%" paddingLeft={get('browser.mobile') ? 0 : 36}>
      <LightCondensedText fontSize={24} textTransform="uppercase">Captured by</LightCondensedText>
      <PageHeading marginTop={6}>
        {piece.artist} {!get('browser.mobile') && <InlineBlock tag="span" whiteSpace="nowrap">(Prison ID #{piece.artistPrisonID})</InlineBlock>}
      </PageHeading>
      <Text marginTop={6}>Serving {piece.artistSentence} for:</Text>
      <Charges
        charge={piece}
        charges={piece.artistCharges}
        textAlign="left"
        marginTop={24}
      />
      {get('browser.mobile') && <TextLink
        href={piece.artistContact ? `/${piece.id}/contact` : piece.artistContactLink}
        display="block"
        fontWeight="bold"
        marginTop={24}
        textAlign="left">
        {piece.artistContact ? 'Contact Info' : 'Contact Link'}
      </TextLink>}
    </ResponsiveColumn>
    {!get('browser.mobile') && <Column
      width="50%"
      paddingRight={36}
      marginTop={24}
      textAlign={get('browser.mobile') ? 'left' : 'right'}>
      <TextLink
        href={`/${piece.id}/references`}
        fontWeight="bold">
        References
      </TextLink>
    </Column>}
    {!get('browser.mobile') && <Column textAlign="left" width="50%" marginTop={24} paddingLeft={36}>
      <TextLink
        href={piece.artistContact ? `/${piece.id}/contact` : piece.artistContactLink}
        fontWeight="bold"
        textAlign="left">
        {piece.artistContact ? 'Contact Info' : 'Contact Link'}
      </TextLink>
    </Column>}
  </Block>
));
