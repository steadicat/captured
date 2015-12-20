import React from 'react';
import {Block} from 'stylistic-elements';
import component from '../lib/component';
import {track} from '../lib/behaviors';
import {linear} from '../lib/math';
import {Link} from '../ui/core';
import {Image} from '../ui/image';
import {DefaultFont, PageTitle, PageSubtitle, Text, CondensedText, LightCondensedText} from '../ui/type';
import {SocialButtons} from '../ui/social';
import {Toolbar} from '../ui/toolbar';
import {Piece} from '../ui/piece';
import {BuyButton} from '../ui/buy';
import {Orders} from '../ui/orders';
import {Scroll} from '../ui/scroll';
import {Gallery} from '../ui/gallery';
import {HeaderText} from '../ui/header';
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
function getSubtitleSize(get) {
  return linear(320, 14, 2000, 32, Math.min(get('browser.width'), get('browser.height') * 2))
}

export const Header = track(component('Header', ({get, actions, ...props}) =>
  <Block paddingTop={0} {...props}>
    <PageTitle display="none">CAPTURED</PageTitle>
    <PageSubtitle display="none">People in prison drawing people who should be</PageSubtitle>
    <HeaderText width="80vw" height="calc(100vh - 46px)" />
    <LightCondensedText
      tag="div"
      fontSize={getSubtitleSize(get) * 1.5}
      lineHeight="2"
      height="calc(100vh - 46px)"
      maxWidth={760}
      marginLeft="auto"
      marginRight="auto"
      paddingLeft={24}
      paddingRight={24}>
      <Block tag="span" position="relative" top="50%" translateY="-50%">
        <Text>
          For over a year, we asked people in prison to paint or draw people we felt <em>should</em> be in prison–the CEOs of companies doing the most damage to our environment, economy, and society.
        </Text>
        <Text marginTop="1em">
          Here are the results, each shown with the crimes committed by the companies as well as the imprisoned artists.
        </Text>
        <Text marginTop="1em">
          We present this project as a way to better to see the crimes that are masquerading as commerce.
        </Text>
      </Block>
    </LightCondensedText>
    <Gallery />
  </Block>
));

export const Footer = track(component('Footer', ({get, actions, ...props}) =>
  <Block {...props}>
    <Block marginBottom={24}>
      <Image
        src="book-photo.jpg"
        width={get('browser.width')}
        height={Math.round(get('browser.width') * 2890 / 4738)}
      />
    </Block>
    {get('sold') >= 1000 ? <CondensedText fontWeight="bold" fontSize={24}>SOLD OUT</CondensedText> : <BuyButton />}
    <Text marginTop={12}>
      {get('sold') > 0
      ? (get('sold') >= 1000 ?
        `Limited edition. ${get('sold')} of ${get('total')} copies sold.`
        : 'Limited edition. All 1000 copies sold out.')
      : 'Limited edition of 1000 copies.'}
    </Text>
    <Text marginTop={24} marginBottom={48}>
      All profits go towards effors to elect
      {' '}
      <Link href="https://berniesanders.com/">Bernie Sanders</Link>’s
      {' '}
      as president.
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
      {get('sold') < 1000 && <Toolbar />}
    </Block>
  </DefaultFont>
);
