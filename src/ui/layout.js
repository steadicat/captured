import React from 'react';
import {InlineBlock} from 'stylistic-elements';
import component from '../lib/component';

export const Column = component('Column', (props) =>
  <InlineBlock verticalAlign="top" boxSizing="border-box" {...props} />
);
