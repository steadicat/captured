import React from 'react';
import {Block} from 'stylistic-elements';
import component from '../lib/component';
import {BuyButton} from '../ui/buy';

export const Toolbar = component('Toolbar', props =>
  <Block
    position="fixed"
    bottom={0}
    left={0}
    right={0}
    background="#fff"
    {...props}>
    <BuyButton width="100%" boxSizing="border-box" borderWidth={0} borderTopWidth={1} />
  </Block>
);
