import {Animate} from '../react-rebound';
import {CondensedText} from '../ui/type';
import {Pay} from '../ui/pay';
import React from 'react';
import component from '../lib/component';
import {hover} from '../lib/behaviors';

export const BuyButton = component(
  'BuyButton',
  ({get, hovered, ref, ...props}) => (
    <Pay
      lineHeight={12}
      borderColor="#444"
      borderStyle="solid"
      borderWidth={1}
      translateZ={0}
      paddingLeft={48}
      paddingRight={48}
      paddingTop={16}
      paddingBottom={16}
      textTransform="uppercase"
      color={hovered ? '#fff' : null}
      ref={ref}
      {...props}
    >
      <CondensedText
        display="inline-block"
        fontSize={18}
        fontWeight="bold"
        verticalAlign="middle"
      >
        {get('sold') >= 1000 ? 'Join the Waitlist' : 'Buy the Book'}
      </CondensedText>
      <CondensedText
        display="inline-block"
        fontSize={18}
        fontWeight="bold"
        verticalAlign="middle"
        marginLeft={get('browser.mobile') ? 4 : 12}
        paddingLeft={get('browser.mobile') ? 4 : 12}
        borderLeftStyle="solid"
        borderLeftWidth={1}
        borderColor={hovered ? '#fff' : '#444'}
      >
        ${get('price')}
      </CondensedText>
      {get('browser.width') > 820 && (
        <CondensedText
          display="inline-block"
          fontSize={18}
          fontWeight="bold"
          verticalAlign="middle"
          marginLeft={get('browser.mobile') ? 4 : 12}
          paddingLeft={get('browser.mobile') ? 4 : 12}
          borderLeftStyle="solid"
          borderLeftWidth={1}
          borderColor={hovered ? '#fff' : '#444'}
        >
          ALL PROFIT GOES TO THE BROOKLYN BAIL FUND
        </CondensedText>
      )}
    </Pay>
  )
);

export const HoverBuyButton = hover(
  component('BuyButton', ({hovered, get, actions, ...props}) => (
    <Animate scaleX={hovered ? 1.1 : 1} scaleY={hovered ? 1.1 : 1}>
      <BuyButton
        backgroundColor={hovered ? [230, 60, 34] : null}
        borderColor={hovered ? [230, 60, 34] : '#444'}
        hovered={hovered}
        {...props}
      />
    </Animate>
  ))
);
