import React from 'react';
import {Block, ResetElement, InlineBlock} from 'stylistic-elements';
import {Animate} from 'react-rebound';
import component from '../lib/component';
import {track} from '../lib/behaviors';
import {Column, ResponsiveColumn} from '../ui/layout';
import {TextLink, Link, Arrow} from '../ui/core';
import {Image} from '../ui/image';
import {Text, CondensedText, LightCondensedText, PageHeading, BoldSmallCaps} from '../ui/type';
import {getSize} from '../ui/gallerylayout';

export const ReferencesLink = component('ReferencesLink', ({piece, ...props}) =>
  <BoldSmallCaps>
    <TextLink
      href={`/${piece.id}/references`}
      display="block"
      {...props}>
      References
    </TextLink>
  </BoldSmallCaps>
);

export const ContactLink = component('ReferencesLink', ({piece, ...props}) =>
  <BoldSmallCaps>
    <TextLink
      target="_blank"
      href={piece.artistContact ? `/${piece.id}/contact` : piece.artistContactLink}
      display="block"
      {...props}>
      {piece.artistContact ? 'Contact Info' : 'Contact Link'}
    </TextLink>
  </BoldSmallCaps>
);

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

export const Piece = track(component('Piece', ({get, actions, piece, ...props}) =>
  <Block {...props}>
    <Link href="/">
      <Image
        src={`${piece.image || piece.id}.jpg`}
        pxWidth={getSize(piece, !get('expanding'), get('browser'))[0]}
        pxHeight={getSize(piece, !get('expanding'), get('browser'))[1]}
        width={getSize(piece, true, get('browser'))[0]}
        height={getSize(piece, true, get('browser'))[1]}
        translateX="-50%"
        position="relative"
        left="50%"
        display="block"
        visibility={get('expanding') ? 'hidden' : 'visible'}
      />
    </Link>
    <Animate opacity={get('seeCrimesShown') ? 1 : 0}>
      <CondensedText
        position="absolute"
        cursor="pointer"
        top={getSize(piece, true, get('browser'))[1] - 80}
        left={0}
        right={0}
        color="#fff"
        textAlign="center"
        fontSize={18}
        opacity={0}
        onClick={actions.scrollToCrimes}>
        See the Crimes
        <Arrow display="block" marginTop={0} marginLeft="auto" marginRight="auto" />
      </CondensedText>
    </Animate>
    <Text
      textAlign="center"
      marginTop={12}
      marginBottom={48}
      fontStyle="italic">
      Materials: {piece.materials}.
    </Text>
    <ResponsiveColumn
      width="50%"
      textAlign={get('browser.mobile') ? 'left' : 'right'}
      paddingRight={get('browser.mobile') ? 0 : 36}
      borderRightStyle="solid"
      borderRightColor="#444"
      borderRightWidth={get('browser.mobile') ? 0 : 1}>
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
      {get('browser.mobile') && <ReferencesLink piece={piece} marginTop={24} marginBottom={48} />}
    </ResponsiveColumn>
    <ResponsiveColumn textAlign="left" width="50%" paddingLeft={get('browser.mobile') ? 0 : 36}>
      <LightCondensedText fontSize={24} textTransform="uppercase">Captured by</LightCondensedText>
      <PageHeading marginTop={6}>
        {piece.artist} {!get('browser.mobile') && <InlineBlock tag="span" whiteSpace="nowrap" verticalAlign="baseline">(Prison ID #{piece.artistPrisonID})</InlineBlock>}
      </PageHeading>
      <Text marginTop={6}>Serving {piece.artistSentence} for:</Text>
      <Charges
        charge={piece}
        charges={piece.artistCharges}
        textAlign="left"
        marginTop={24}
      />
      {get('browser.mobile') && <ContactLink piece={piece} marginTop={24} />}
    </ResponsiveColumn>
    {!get('browser.mobile') && <Column
      width="50%"
      paddingRight={36}
      paddingTop={36}
      textAlign="right"
      borderRightStyle="solid"
      borderRightColor="#444"
      borderRightWidth={1}>
      <ReferencesLink piece={piece} />
    </Column>}
    {!get('browser.mobile') && <Column textAlign="left" width="50%" paddingTop={36} paddingLeft={36}>
      <ContactLink piece={piece} />
    </Column>}
  </Block>
));
