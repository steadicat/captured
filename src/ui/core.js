import React from 'react';
import {Animate} from 'react-rebound';
import {ResetElement} from 'stylistic-elements';
import component from '../lib/component';
import {hover} from '../lib/behaviors';

export const Link = hover(component('Link', ({hovered, ...props}) =>
  <Animate color={hovered ? [198, 60, 38] : [0, 0, 0]}>
    <ResetElement
      tag="a"
      cursor="pointer"
      fontWeight="bold"
      {...props}
    />
  </Animate>
));

export const Button = component('Button', (props) =>
  <ResetElement
    display="inline-block"
    role="button"
    cursor="pointer"
    borderColor="#444"
    borderStyle="solid"
    borderWidth={1}
    {...props}
  />
);

export const MainButton = hover(component('MainButton', ({hovered, get, ...props}) =>
  <Animate scaleX={hovered ? 1.1 : 1} scaleY={hovered ? 1.1 : 1}>
    <Button
      lineHeight={12}
      backgroundColor={hovered ? [198, 60, 38] : '#fff'}
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
      {...props}
    />
  </Animate>
));

export const Input = component('Input', ({label, ...props}) =>
  <ResetElement
    tag="input"
    type="text"
    placeholder={label}
    {...props}
  />
);
