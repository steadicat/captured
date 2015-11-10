import React from 'react';
import {Animate} from 'react-rebound';
import {ResetElement, InlineBlock} from 'stylistic-elements';
import component from '../lib/component';
import {hover} from '../lib/behaviors';

/*
function onClick(event) {
  if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;
  event.preventDefault();
  this.props.actions.navigation.navigate(this.props.href);
}
*/

export const Link = hover(component('Link', ({hovered, ...props}) =>
  <Animate color={hovered ? [238, 85, 34] : [0, 0, 0]}>
    <ResetElement
      tag="a"
      cursor="pointer"
      fontWeight="bold"
      {...props}
    />
  </Animate>
));

export const Button = component('Button', (props) =>
  <InlineBlock
    role="button"
    cursor="pointer"
    borderColor="#444"
    borderStyle="solid"
    borderWidth={1}
    {...props}
  />
);
