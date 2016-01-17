import React from 'react';
import {Animate} from 'react-rebound';
import {connect} from 'ducts';
import {ResetElement} from 'stylistic-elements';
import component from '../lib/component';
import * as history from '../lib/history';
import {hover} from '../lib/behaviors';

@connect
export class Link extends React.Component {
  onLinkClick = (event) => {
    const {href} = this.props;
    if (!/^http(s?):\/\//.test(href)) {
      event.preventDefault();
      history.pushState(href);
      this.props.actions.navigate(href);
    }
  };

  render() {
    return (
      <ResetElement
        tag="a"
        cursor="pointer"
        fontWeight="bold"
        onClick={this.onLinkClick}
        {...this.props}
      />
    );
  }
}


export const TextLink = hover(component('TextLink', ({hovered, ...props}) =>
  <Animate color={hovered ? [230, 60, 34] : [0, 0, 0]}>
    <Link fontWeight="bold" {...props} />
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
      backgroundColor={hovered ? [230, 60, 34] : '#fff'}
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

export const List = component('List', ({...props}) =>
  <ResetElement tag="ul" {...props} />
);

export const ListItem = component('ListItem', ({...props}) =>
  <ResetElement tag="li" {...props} />
);
