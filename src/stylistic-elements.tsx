import React, {CSSProperties} from 'react';
import {extract, Tags, TagElement, TagProps} from 'stylistic';

type TagRef<Tag extends Tags> = React.Ref<TagElement<Tag> | null>;

let RENDER_LOGGING = false;

export function enableRenderLogging(enabled: boolean) {
  RENDER_LOGGING = enabled;
}

const log =
  process.env.NODE_ENV === 'production'
    ? (x: any) => x
    : (shouldRender: boolean, displayName: string, reason: string) => {
        if (RENDER_LOGGING && shouldRender) {
          /* eslint no-console:0 */
          console.info(`${displayName} rerendered because ${reason}.`);
        }
        return shouldRender;
      };

export const Element = React.memo(
  React.forwardRef(function Element<Tag extends Tags = 'div'>(
    props: TagProps<Tag>,
    ref: TagRef<Tag>
  ) {
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
        ref={ref}
      />
    );
  })
);

export const ResetElement = React.memo(
  React.forwardRef(function ResetElement<Tag extends Tags = 'div'>(
    props: TagProps<Tag>,
    ref: TagRef<Tag>
  ) {
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
        ref={ref}
      />
    );
  })
);

export const Block = React.memo(
  React.forwardRef(function Block<Tag extends Tags>(
    props: TagProps<Tag>,
    ref: TagRef<Tag>
  ) {
    return <Element display="block" {...props} ref={ref} />;
  })
);

export const Inline = React.memo(
  React.forwardRef(function Inline<Tag extends Tags>(
    props: TagProps<Tag>,
    ref: TagRef<Tag>
  ) {
    return <Element tag="span" {...props} ref={ref} />;
  })
);

export const InlineBlock = React.memo(
  React.forwardRef(function InlineBlock<Tag extends Tags>(
    props: TagProps<Tag>,
    ref: TagRef<Tag>
  ) {
    return (
      <Element
        display="inline-block"
        verticalAlign="middle"
        {...props}
        ref={ref}
      />
    );
  })
);
