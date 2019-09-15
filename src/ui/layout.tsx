import {Element, InlineBlock} from '../stylistic-elements';

import React from 'react';
import component from '../lib/component';

export const Column = component('Column', ({$, get, ...props}) => (
  <InlineBlock verticalAlign="top" boxSizing="border-box" {...props} />
));

export const ResponsiveColumn = component(
  'ResponsiveColumn',
  ({$, get, minimumWidth = 740, width, ...props}) => (
    <Element
      display={get('browser.width') > minimumWidth ? 'inline-block' : 'block'}
      width={get('browser.width') > minimumWidth ? width : null}
      verticalAlign="top"
      boxSizing="border-box"
      {...props}
    />
  )
);
