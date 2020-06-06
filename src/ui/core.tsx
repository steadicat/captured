import * as history from '../lib/history';

import {Block, InlineBlock, ResetElement} from '../stylistic-elements';

import {Animate} from '../react-rebound';
import {CONDENSED} from './type';
import React from 'react';
import {hover} from '../lib/behaviors';
import {Actions} from '../actions';
import {TagProps} from 'stylistic';
import component from '../lib/component';

export const Link = component<TagProps<'a'> & {href: string}>(
  'Link',
  ({get, actions, href, ...props}, ref) => {
    const onLinkClick = React.useCallback((event) => {
      if (event.shiftKey || event.metaKey || event.superKey || event.controlKey)
        return;
      if (!/^http(s?):\/\//.test(href) && !/^mailto:/.test(href)) {
        event.stopPropagation();
        event.preventDefault();
        history.pushState(href);
        actions.navigate(href);
      }
    }, []);

    return (
      <ResetElement
        tag="a"
        cursor="pointer"
        style={{WebkitTapHighlightColor: 'transparent'}}
        href={href}
        onClick={onLinkClick}
        {...props}
        ref={ref}
      />
    );
  }
);

export const TextLink = hover(
  component<{hovered: boolean} & TagProps<'a'>>(
    'TextLink',
    ({get, hovered, ...props}) => (
      <Animate color={hovered ? [230, 60, 34] : [0, 0, 0]}>
        <Link fontWeight="bold" {...props} />
      </Animate>
    )
  )
);

export const Button = component<{}>('Button', ({get, ...props}, ref) => (
  <InlineBlock role="button" cursor="pointer" {...props} ref={ref} />
));

export const HoverButtonLink = hover(
  component<{hovered: boolean}>(
    'HoverButtonLink',
    ({get, hovered, ...props}) => (
      <Animate scaleX={hovered ? 1.1 : 1} scaleY={hovered ? 1.1 : 1}>
        <Link
          lineHeight={12}
          backgroundColor={hovered ? [230, 60, 34] : '#fff'}
          color={hovered ? '#fff' : '#444'}
          borderColor={hovered ? [230, 60, 34] : '#444'}
          borderStyle="solid"
          borderWidth={1}
          translateZ={0}
          paddingLeft={12}
          paddingRight={12}
          paddingTop={6}
          paddingBottom={6}
          fontSize={18}
          fontFamily={CONDENSED}
          fontWeight={700}
          textDecoration="none"
          {...props}
        />
      </Animate>
    )
  )
);

export const MainButton = hover(
  component<{hovered: boolean} & TagProps<'button'>>(
    'MainButton',
    ({get, hovered, ...props}) => (
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
    )
  )
);

export const Input = component<{label: string}>(
  'Input',
  ({label, get, actions, ...props}) => (
    <ResetElement tag="input" type="text" placeholder={label} {...props} />
  )
);

export const List = component<{}>('List', ({get, actions, ...props}) => (
  <ResetElement tag="ul" {...props} />
));

export const ListItem = component<{}>(
  'ListItem',
  ({get, actions, ...props}) => <ResetElement tag="li" {...props} />
);

export const Close = component<
  {color?: string; width?: number; height?: number} & TagProps<'svg'>
>(
  'Close',
  ({color = '#444', width = 46, height = 46, get, actions, ...props}) => (
    <InlineBlock
      tag="svg"
      viewBox="0 0 46 46"
      stroke={color}
      width={width}
      height={height}
      {...props}
    >
      <path d="M11.75,34.25 L34.25,11.75" />
      <path d="M11.75,11.75 L34.25,34.25" />
    </InlineBlock>
  )
);

export const Arrow = component<{
  color?: string;
  width?: number;
  height?: number;
}>(
  'Arrow',
  ({color = '#fff', width = 46, height = 46, get, actions, ...props}) => (
    <InlineBlock
      tag="svg"
      viewBox="0 0 46 46"
      stroke={color}
      width={width}
      height={height}
      animation="pulse 1s ease-in-out infinite"
      {...props}
    >
      <path d="M23,28 L34.25,16.75" />
      <path d="M11.75,16.75 L23,28" />
    </InlineBlock>
  )
);

export const Modal = component<{autoWidth?: boolean}>(
  'Modal',
  ({get, autoWidth = false, children, ...props}) => (
    <Block
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      background="rgba(255, 255, 255, 0.95)"
      zIndex={10}
      {...props}
    >
      <Block
        width={autoWidth ? undefined : get('browser.mobile') ? '100%' : '80%'}
        maxWidth={800}
        paddingLeft={24}
        paddingRight={24}
        boxSizing="border-box"
        position="absolute"
        top="50%"
        left="50%"
        translateX="-50%"
        translateY="-50%"
      >
        {children}
      </Block>
    </Block>
  )
);
