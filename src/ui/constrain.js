import React from 'react';
import {ResetElement, Block} from 'stylistic-elements';
import component from '../lib/component';

export const Body = component('Body', ({get, children, ...props}) =>
  <ResetElement
    tag="body"
    overflow={get('constraint') ? 'hidden' : null}
    minHeight="101vh"
    {...props}>
    <Block
      position="relative"
      top={get('constraint') ? get('constraint')[0] : null}
      overflow={get('constraint') ? 'auto' : null}
      zIndex={0}
      height={get('constraint') ? '100vh' : null}
      style={{overflowScrolling: get('constraint') ? 'touch' : null}}>
      <Block
        position="relative"
        overflow={get('constraint') ? 'hidden' : null}
        marginTop={get('constraint') ? -get('constraint')[0] : null}
        height={get('constraint') ? (get('constraint')[1]) : null}>
        {children}
      </Block>
    </Block>
  </ResetElement>
);
