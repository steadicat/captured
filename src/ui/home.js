import React from 'react';
import {Block} from 'stylistic-elements';
import component from '../lib/component';
import {track} from '../lib/behaviors';
import {linear} from '../lib/math';
import {TextLink, Link} from '../ui/core';
import {Image} from '../ui/image';
import {DefaultFont, Text, CondensedText, LightCondensedText} from '../ui/type';
import {SocialLinks} from '../ui/social';
import {Toolbar} from '../ui/toolbar';
import {HoverBuyButton} from '../ui/buy';
import {Gallery} from '../ui/gallery';
import {HeaderTitle, HeaderSubtitle} from '../ui/header';
import {Bernie} from '../ui/bernie';

function getPrefaceSize(get) {
  return linear(320, 18, 2000, 56, Math.min(get('browser.width'), get('browser.height') * 1.4));
}

export const Header = track(component('Header', ({get, actions, ...props}) =>
  <Block paddingTop={0} {...props}>
    <Block tag="h1" display="none">CAPTURED</Block>
    <Block tag="h2" display="none">People in prison drawing people who should be</Block>
    {get('browser.mobile') && <Block
      position="absolute"
      zIndex={1}
      top="70vh"
      left={0}
      right={0}
      textAlign="center">
      All profits go to <Link target="_blank" href="https://berniesanders.com/"><Bernie height={16} /></Link>
    </Block>}
    <Block height="calc(100vh - 46px)" position="relative">
      <Block position="absolute" top="50%" left={0} right={0} translateY="-50%">
        <HeaderTitle width="80vw" />
        <HeaderSubtitle width="calc(100% - 48px)" maxWidth={600} marginTop={48} />
      </Block>
    </Block>
    <Block>
      <Image
        src="book-orange.jpg"
        width={get('browser.width')}
        height={get('browser.height') - 46}
      />
    </Block>
    <LightCondensedText
      tag="div"
      fontSize={getPrefaceSize(get)}
      lineHeight="2"
      minHeight="calc(100vh - 46px)"
      maxWidth={getPrefaceSize(get) * 26}
      marginLeft="auto"
      marginRight="auto"
      paddingTop={48}
      paddingBottom={48}
      paddingLeft={24}
      paddingRight={24}
      boxSizing="border-box">
      <Block tag="span" position="relative" top="calc(50vh - 23px - 48px)" translateY="-50%">
        <Text>
          For over a year, we asked people in prison to paint or draw people we felt <em>should</em> be in prison–the CEOs of companies destroying our environment, economy,&nbsp;and&nbsp;society.
        </Text>
        <Text marginTop={16}>
          Here are the results, shown with the crimes committed by both the companies and the&nbsp;artists.
        </Text>
        <Text marginTop={16}>
          We present this project to help expose crimes masquerading&nbsp;as&nbsp;commerce.
        </Text>
      </Block>
    </LightCondensedText>
    <Gallery />
  </Block>
));

function bookWidth(get) {
  return linear(320, 300, 1800, 800, get('browser.width'));
}

export const Footer = track(component('Footer', ({get, actions, ...props}) =>
  <Block paddingTop={48} {...props}>
    <Block marginBottom={48}>
      <Image
        src="book-white.jpg"
        width={Math.round(bookWidth(get))}
        height={Math.round(bookWidth(get) * 2148 / 5098)}
      />
    </Block>
    {get('sold') >= 1000 ? <CondensedText fontWeight="bold" fontSize={24}>SOLD OUT</CondensedText> : <HoverBuyButton />}
    <Text marginTop={12}>
      {get('sold') > 0
      ? (get('sold') < 1000 ?
        `Limited edition. ${get('sold')} of ${get('total')} copies sold.`
        : 'Limited edition. All 1000 copies sold out.')
      : 'Limited edition of 1000 copies.'}
    </Text>
    <Text marginTop={24} marginBottom={48} marginLeft="auto" marginRight="auto" maxWidth={648} paddingLeft={24} paddingRight={24}>
      All profits go towards efforts to elect
      {' '}
      <TextLink target="_blank" href="https://berniesanders.com/">Bernie Sanders</TextLink>
      {' '}
      as&nbsp;president. One of the main pillars of his presidential campaign is to eliminate corporate control over government.
    </Text>
    <Block paddingBottom={96}>
      <TextLink
        href="/about"
        display="inline-block"
        verticalAlign="top"
        marginTop={12}
        marginBottom={12}>
        <CondensedText
          tag="span"
          fontSize={18}
          paddingTop={16}
          paddingLeft={16}
          paddingRight={16}
          paddingBottom={16}>
          ABOUT THE PROJECT
        </CondensedText>
      </TextLink>
      <SocialLinks marginTop={0} marginBottom={12} marginLeft={24} marginRight={24} verticalAlign="top" />
    </Block>
  </Block>
));

export const Home = component('Home', ({get, actions, ...props}) =>
  <DefaultFont>
    <Block textAlign="center">
      <Header trackKey="" />
      <Footer trackKey="act" />
      <Toolbar />
    </Block>
  </DefaultFont>
);
