import React from 'react';
import {Animate} from 'react-rebound';
import {connect} from 'ducts';
import {ResetElement, InlineBlock, Block} from 'stylistic-elements';
import component from '../lib/component';
import * as history from '../lib/history';
import {hover} from '../lib/behaviors';

@connect
export class Link extends React.Component {
  onLinkClick = (event) => {
    if (event.shiftKey || event.metaKey || event.superKey || event.controlKey) return;
    const {href} = this.props;
    if (!/^http(s?):\/\//.test(href) && !/^mailto:/.test(href)) {
      event.stopPropagation();
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

export const Close = component('Close', ({color = '#444', width = 46, height = 46, ...props}) =>
  <InlineBlock tag="svg" viewBox="0 0 46 46" stroke={color} width={width} height={height} {...props}>
    <path d="M11.75,34.25 L34.25,11.75" />
    <path d="M11.75,11.75 L34.25,34.25" />
  </InlineBlock>
);

export const Modal = component('Modal', ({get, children, ...props}) =>
  <Block
    position="fixed"
    top={0}
    left={0}
    right={0}
    bottom={0}
    background="rgba(255, 255, 255, 0.95)"
    zIndex={10}
    {...props}>
    <Block
      width={get('browser.mobile') ? '100%' : '80%'}
      maxWidth={800}
      paddingLeft={24}
      paddingRight={24}
      boxSizing="border-box"
      position="absolute"
      top="50%"
      left="50%"
      translateX="-50%"
      translateY="-50%">
      {children}
    </Block>
  </Block>
);
