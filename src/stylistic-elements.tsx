import React from 'react';
import {extract} from 'stylistic';

let RENDER_LOGGING = false;

export function enableRenderLogging(enabled) {
  RENDER_LOGGING = enabled;
}

const log =
  process.env.NODE_ENV === 'production'
    ? x => x
    : (shouldRender, displayName, reason) => {
        if (RENDER_LOGGING && shouldRender) {
          /* eslint no-console:0 */
          console.info(`${displayName} rerendered because ${reason}.`);
        }
        return shouldRender;
      };

export function component(statelessComponent) {
  const displayName = statelessComponent.name;
  class Component extends React.Component {
    static displayName = displayName;
    render() {
      return statelessComponent(this.props);
    }
  }
  return React.forwardRef((props, ref) => (
    <Component {...props} forwardedRef={ref} />
  ));
}

export const Element = component(function Element({forwardedRef, ...props}) {
  const attributes = extract(props);

  const {
    tag: Tag = 'div',
    canvasHeight,
    canvasWidth,
    style,
    ...plainAttributes
  } = attributes;

  return (
    <Tag
      style={style}
      width={canvasWidth}
      height={canvasHeight}
      {...plainAttributes}
      ref={forwardedRef}
    />
  );
});

export const ResetElement = component(function ResetElement({
  forwardedRef,
  ...props
}) {
  return (
    <Element
      color="inherit"
      fontFamily="inherit"
      fontWeight="inherit"
      fontSize="inherit"
      textDecoration="none"
      marginTop={0}
      marginRight={0}
      marginBottom={0}
      marginLeft={0}
      paddingTop={0}
      paddingRight={0}
      paddingBottom={0}
      paddingLeft={0}
      {...props}
      ref={forwardedRef}
    />
  );
});

export const Block = component(function Block({forwardedRef, ...props}) {
  return <Element display="block" {...props} ref={forwardedRef} />;
});

export const Inline = component(function Inline({forwardedRef, ...props}) {
  return <Element tag="span" {...props} ref={forwardedRef} />;
});

export const InlineBlock = component(function InlineBlock({
  forwardedRef,
  ...props
}) {
  return (
    <Element
      display="inline-block"
      verticalAlign="middle"
      {...props}
      ref={forwardedRef}
    />
  );
});
