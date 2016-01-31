import React from 'react';
import {Block, ResetElement, InlineBlock} from 'stylistic-elements';
import component from '../lib/component';
import {track} from '../lib/behaviors';
import {Column, ResponsiveColumn} from '../ui/layout';
import {TextLink} from '../ui/core';
import {Text, LightCondensedText, PageHeading} from '../ui/type';

function humanizeLink(link) {
  return link.replace(/^https?:\/\/(www\.)?/, '');
}

export const Modal = component('Modal', ({children, ...props}) =>
  <Block
    position="fixed"
    top={0}
    left={0}
    right={0}
    bottom={0}
    background="rgba(255, 255, 255, 0.95)"
    zIndex={10}
    {...props}>
    <Block
      maxWidth="80%"
      paddingLeft={24}
      paddingRight={24}
      boxSizing="border-box"
      position="absolute"
      top="50%"
      left="50%"
      translateX="-50%"
      translateY="-50%">
      {children}
    </Block>
  </Block>
);

export const Charges = component('Charges', ({get, charges, ...props}) =>
  <ResetElement tag="ul" listStyleType="none" {...props}>
    {charges.reverse().map((c, i) =>
      <ResetElement tag="li" key={i} marginTop={24}>
        <Text fontWeight="bold">{c.title || c}</Text>
        {c.description && <Text>{c.description}</Text>}
      </ResetElement>
    )}
  </ResetElement>
);

export const Piece = track(component('Piece', ({get, piece, ...props}) =>
  <Block {...props}>
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
    {get('path').split('/')[2] === 'references' && <Modal>
      {piece.links.map((link, i) =>
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
    {piece.artistContact && get('path').split('/')[2] === 'contact' && <Modal whiteSpace="pre">
      {piece.artistContact}
    </Modal>}
  </Block>
));
