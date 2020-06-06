import {
  BoldText,
  CondensedText,
  DefaultFont,
  LightCondensedText,
  Text,
} from '../ui/type';
import {Button, HoverButtonLink, Link, TextLink} from '../ui/core';
import {HeaderSubtitle, HeaderTitle} from '../ui/header';

import {Block} from '../stylistic-elements';
import {Gallery} from '../ui/gallery';
import {HoverBuyButton} from '../ui/buy';
import {Image} from '../ui/image';
import React from 'react';
import {SocialLinks} from '../ui/social';
import {Toolbar} from '../ui/toolbar';
import component from '../lib/component';
import {linear} from '../lib/math';
import {track} from '../lib/behaviors';

function getPrefaceSize(get) {
  return linear(
    320,
    18,
    2000,
    56,
    Math.min(get('browser.width'), get('browser.height') * 1.4)
  );
}

export const Header = track(
  component('Header', ({trackKey, get, actions, ...props}) => (
    <Block paddingTop={0} {...props}>
      <Block tag="h1" display="none">
        CAPTURED
      </Block>
      <Block tag="h2" display="none">
        People in prison drawing people who should be
      </Block>
      <Block height="100vh" position="relative">
        <Block
          position="absolute"
          top="45%"
          left={0}
          right={0}
          translateY="-50%"
        >
          <HeaderTitle width="80vw" />
          <HeaderSubtitle
            width="calc(100% - 48px)"
            maxWidth={600}
            marginTop={48}
          />
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
        maxWidth={getPrefaceSize(get) * 26 + 48}
        marginLeft="auto"
        marginRight="auto"
        paddingLeft={24}
        paddingRight={24}
        paddingTop={48}
        paddingBottom={48}
        boxSizing="border-box"
        display="table"
      >
        <Block tag="span" display="table-cell" verticalAlign="middle">
          <Text>
            For over a year, we asked people in prison to paint or draw people
            we felt <em>should</em> be in prison–the CEOs of companies
            destroying our environment, economy,&nbsp;and&nbsp;society.
          </Text>
          <Text marginTop={16}>
            Here are the results. Click on the images to see the crimes
            committed by both the companies and the&nbsp;artists.
          </Text>
          <Text marginTop={16}>
            We present this project to help expose crimes
            masquerading&nbsp;as&nbsp;commerce.
          </Text>
        </Block>
      </LightCondensedText>
      <Gallery />
    </Block>
  ))
);

function bookWidth(get) {
  return linear(320, 300, 1800, 800, get('browser.width'));
}

export const Footer = track(
  component('Footer', ({trackKey, get, actions, ...props}) => (
    <Block paddingTop={48} {...props}>
      <Block marginBottom={48}>
        <Image
          src="book-white.jpg"
          width={Math.round(bookWidth(get))}
          height={Math.round((bookWidth(get) * 2148) / 5098)}
        />
      </Block>
      <HoverBuyButton />
      <Text
        marginTop={12}
        marginLeft="auto"
        marginRight="auto"
        maxWidth={580}
        paddingLeft={24}
        paddingRight={24}
      >
        {get('sold') >= 1000 ? (
          'The book is currently sold out. Orders placed now will be put on standby and only billed if copies become available.'
        ) : (
          <>
            A limited run of 1,000{' '}
            <BoldText tag="strong">softcover versions</BoldText> of the book are
            now available for $30&nbsp;(including&nbsp;shipping). These are for
            sale in the USA only.
          </>
        )}
      </Text>
      <Text
        marginTop={24}
        marginLeft="auto"
        marginRight="auto"
        maxWidth={580}
        paddingLeft={24}
        paddingRight={24}
      >
        In 2016, 1,000 hardcover books (shown above) sold out in one week. All
        profits went towards efforts to elect Bernie Sanders as&nbsp;president,
        since holding corporations responsible for their crimes, reforming the
        criminal justice system, and removing corporate control over government
        were pillars of his campaign.
      </Text>
      <Text
        marginTop={12}
        marginBottom={48}
        marginLeft="auto"
        marginRight="auto"
        maxWidth={580}
        paddingLeft={24}
        paddingRight={24}
      >
        All profits from this softcover version will be donated to{' '}
        <TextLink href="https://www.brooklynbailfund.org/">
          The Brooklyn Community Bail Fund
        </TextLink>
        , an organization that helps victims of our racist and unjust legal
        system.
      </Text>
      <Block paddingBottom={96}>
        <HoverButtonLink
          href="/about"
          display="inline-block"
          verticalAlign="top"
          marginTop={13}
          marginBottom={13}
        >
          ABOUT THE PROJECT
        </HoverButtonLink>
        <SocialLinks
          marginTop={0}
          marginBottom={12}
          marginLeft={24}
          marginRight={24}
          verticalAlign="top"
        />
      </Block>
    </Block>
  ))
);

export const Home = component('Home', ({get, actions, ...props}) => (
  <DefaultFont>
    <Block textAlign="center">
      <Header trackKey="" />
      <Footer trackKey="act" />
      <Toolbar />
    </Block>
  </DefaultFont>
));
