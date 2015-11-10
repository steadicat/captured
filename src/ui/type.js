import React from 'react';
import {ResetElement} from 'stylistic-elements';
import component from '../lib/component';

const REGULAR = 'yantramanav, sans-serif';
const CONDENSED = 'oswald, "roboto condensed", sans-serif';

export const DefaultFont = component('DefaultFont', ({children, ...props}) =>
  React.cloneElement(React.Children.only(children), {
    fontFamily: REGULAR,
    fontSize: 16,
    fontWeight: 300,
    lineHeight: 24,
    textRendering: 'optimizeLegibility',
    color: '#444',
  })
);

export const PageTitle = component('PageTitle', (props) =>
  <ResetElement
    tag="h1"
    fontFamily={CONDENSED}
    fontSize={96}
    fontWeight={700}
    lineHeight={96}
    {...props}
  />
);

export const PageSubtitle = component('PageSubtitle', (props) =>
  <ResetElement
    tag="h2"
    fontFamily={CONDENSED}
    fontWeight={300}
    textTransform="uppercase"
    fontSize={20}
    {...props}
  />
);

export const PageHeading = component('PageSubtitle', (props) =>
  <ResetElement
    tag="h3"
    fontFamily={CONDENSED}
    fontWeight={700}
    textTransform="uppercase"
    fontSize={24}
    {...props}
  />
);

export const Text = component('Text', (props) =>
  <ResetElement tag="p" {...props} />
);

export const BoldText = component('BoldText', (props) =>
  <Text fontWeight={700} {...props} />
);

export const CondensedText = component('CondensedText', props =>
  <Text
    fontFamily={CONDENSED}
    fontWeight={700}
    textTransform="uppercase"
    {...props}
  />);

export const LightCondensedText = component('CondensedText', props =>
  <Text
    fontFamily={CONDENSED}
    fontWeight={300}
    {...props}
  />);

