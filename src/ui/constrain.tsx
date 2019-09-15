import React from 'react';
import {ResetElement} from '../stylistic-elements';
import component from '../lib/component';
import {isExpanded} from '../ui/gallerylayout';

export const Body = component('Body', ({get, ...props}) => (
  <ResetElement
    tag="body"
    overflow={isExpanded(get('path')) ? 'hidden' : null}
    minHeight="101vh"
    {...props}
  />
));
