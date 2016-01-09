import React from 'react';
import {Block} from 'stylistic-elements';
import component from '../lib/component';
import {track} from '../lib/behaviors';
import {linear} from '../lib/math';
import {TextLink} from '../ui/core';
import {Image} from '../ui/image';
import {DefaultFont, PageSubtitle, Text, CondensedText, LightCondensedText} from '../ui/type';
import {SocialButtons} from '../ui/social';
import {Toolbar} from '../ui/toolbar';
import {Piece} from '../ui/piece';
import {BuyButton} from '../ui/buy';
import {Orders} from '../ui/orders';
import {Scroll} from '../ui/scroll';
import {Gallery} from '../ui/gallery';
import {HeaderText} from '../ui/header';
import {About} from '../ui/about';
import data from '../data';

export const Router = component('Router', ({get}) => {
  if (!get('shown')) return <Placeholder />;
  if (get('path') === '/orders') return <Orders />;
  return <Home />;
});

export const Placeholder = component('Placeholder', () =>
  <DefaultFont>
    <Block>
      <PageSubtitle textAlign="center" marginTop={96}>
        Coming Soon.
      </PageSubtitle>
    </Block>
  </DefaultFont>
);

/*
function getTitleSize(get) {
  return linear(320, 68, 2000, 96 + 96, Math.min(get('browser.width'), get('browser.height') * 2));
}
*/
function getPrefaceSize(get) {
  return linear(320, 18, 2000, 56, Math.min(get('browser.width'), get('browser.height') * 2));
}

export const Header = track(component('Header', ({get, actions, ...props}) =>
  <Block paddingTop={0} {...props}>
    <Block tag="h1" display="none">CAPTURED</Block>
    <Block tag="h2" display="none">People in prison drawing people who should be</Block>
    <HeaderText width="80vw" height="calc(100vh - 46px)" />
    <Block>
      <Image
        src="book-photo.jpg"
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
          For over a year, we asked people in prison to paint or draw people we felt <em>should</em> be in prison–the CEOs of companies doing the most damage to our environment, economy,&nbsp;and&nbsp;society.
        </Text>
        <Text marginTop={16}>
          Here are the results, each shown with the crimes committed by the companies as well as the imprisoned&nbsp;artists.
        </Text>
        <Text marginTop={16}>
          We present this project as a way to better to see the crimes that are masquerading as&nbsp;commerce.
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
    {get('sold') >= 1000 ? <CondensedText fontWeight="bold" fontSize={24}>SOLD OUT</CondensedText> : <BuyButton />}
    <Text marginTop={12}>
      {get('sold') > 0
      ? (get('sold') < 1000 ?
        `Limited edition. ${get('sold')} of ${get('total')} copies sold.`
        : 'Limited edition. All 1000 copies sold out.')
      : 'Limited edition of 1000 copies.'}
    </Text>
    <Text marginTop={24} marginBottom={48}>
      All profits go towards effors to elect
      {' '}
      <TextLink href="https://berniesanders.com/">Bernie Sanders</TextLink>
      {' '}
      as&nbsp;president.
    </Text>
    <SocialButtons url="https://thecapturedproject.com/" marginBottom={96} />
  </Block>
));

export const Home = component('Home', ({get, actions, ...props}) =>
  <DefaultFont>
    <Block textAlign="center" onClick={actions.toggleClick}>
      <Header trackKey="" />
      {/*
      <Scroll data={data} margin={200}>
        {(piece, i) =>
          <Piece
            key={piece.id}
            trackKey={piece.id}
            piece={piece}
            width="80%"
            marginLeft="auto"
            marginRight="auto"
            paddingBottom={96}
          />
        }
      </Scroll>*/}
      <Footer trackKey="act" />
      <About trackKey="about" />
      {get('sold') < 1000 && <Toolbar />}
    </Block>
  </DefaultFont>
);
