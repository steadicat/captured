import React from 'react';
import {ResetElement} from '../stylistic-elements';
import component from '../lib/component';

export const REGULAR = 'roboto, sans-serif';
export const CONDENSED = '"roboto condensed", sans-serif';

export const DefaultFont = component('DefaultFont', ({children, ...props}) =>
  React.cloneElement(React.Children.only(children), {
    fontFamily: REGULAR,
    fontSize: 14,
    fontWeight: 300,
    lineHeight: 24,
    textRendering: 'optimizeLegibility',
    color: '#444'
  })
);

export const SmallCaps = component('SmallCaps', ({children, ...props}) =>
  React.cloneElement(React.Children.only(children), {
    fontFamily: CONDENSED,
    fontWeight: 300,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: '86%'
  })
);

export const BoldSmallCaps = component(
  'SmallCaps',
  ({children, get, actions, ...props}) =>
    React.cloneElement(React.Children.only(children), {
      fontFamily: CONDENSED,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      fontSize: '86%'
    })
);

export const PageTitle = component('PageTitle', ({get, actions, ...props}) => (
  <ResetElement
    tag="h1"
    fontFamily={CONDENSED}
    fontSize={48}
    fontWeight={700}
    lineHeight={96}
    {...props}
  />
));

export const PageSubtitle = component(
  'PageSubtitle',
  ({get, actions, ...props}) => (
    <ResetElement
      tag="h2"
      fontFamily={CONDENSED}
      fontWeight={300}
      textTransform="uppercase"
      fontSize={20}
      {...props}
    />
  )
);

export const PageHeading = component(
  'PageSubtitle',
  ({get, actions, ...props}) => (
    <ResetElement
      tag="h3"
      fontFamily={CONDENSED}
      fontWeight={700}
      textTransform="uppercase"
      fontSize={24}
      {...props}
    />
  )
);

export const Text = component('Text', ({get, actions, ...props}) => (
  <ResetElement tag="p" {...props} />
));

export const BoldText = component('BoldText', ({get, actions, ...props}) => (
  <Text fontWeight={700} {...props} />
));

export const CondensedText = component(
  'CondensedText',
  ({get, actions, ...props}) => (
    <Text
      fontFamily={CONDENSED}
      fontWeight={700}
      textTransform="uppercase"
      {...props}
    />
  )
);

export const LightCondensedText = component(
  'CondensedText',
  ({get, actions, ...props}) => (
    <Text fontFamily={CONDENSED} fontWeight={300} {...props} />
  )
);
