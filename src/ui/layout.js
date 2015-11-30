import React from 'react';
import {Element, InlineBlock} from 'stylistic-elements';
import component from '../lib/component';

export const Column = component('Column', (props) =>
  <InlineBlock verticalAlign="top" boxSizing="border-box" {...props} />
);

export const ResponsiveColumn = component('ResponsiveColumn', ({minimumWidth=740, width, ...props}) =>
  <Element
    display={get('browser.width') > minimumWidth ? 'inline-block' : 'block'}
    width={get('browser.width') > minimumWidth ? width : null}
    verticalAlign="top"
    boxSizing="border-box"
    {...props}
  />
);
