import React from 'react';
import {connect} from 'ducts';
import {Animate} from 'react-rebound';
import component from '../lib/component';
import {hover} from '../lib/behaviors';
import {CondensedText} from '../ui/type';
import {Pay} from '../ui/pay';

export const BuyButton = hover(connect(component('BuyButton', ({hovered, get, ...props}) =>
  <Animate scaleX={hovered ? 1.1 : 1} scaleY={hovered ? 1.1 : 1}>
    <Pay
      lineHeight={12}
      backgroundColor={hovered ? '#e52' : null}
      color={hovered ? '#fff' : null}
      borderColor={hovered ? '#e52' : '#444'}
      borderStyle="solid"
      borderWidth={1}
      translateZ={0}
      paddingLeft={48}
      paddingRight={48}
      paddingTop={16}
      paddingBottom={16}
      textTransform="uppercase"
      {...props}>
      <CondensedText
        display="inline-block"
        fontSize={18}
        fontWeight="bold"
        verticalAlign="middle">
        Buy the Book
      </CondensedText>
      <CondensedText
        display="inline-block"
        fontSize={18}
        fontWeight="bold"
        verticalAlign="middle"
        marginLeft={12}
        paddingLeft={12}
        borderLeftStyle="solid"
        borderLeftWidth={1}
        borderColor={hovered ? '#fff' : '#444'}>
        ${get('price')}
      </CondensedText>
    </Pay>
  </Animate>
)));
