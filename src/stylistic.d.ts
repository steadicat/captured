declare module 'stylistic' {
  type Tags = 'div' | 'a' | 'input' | 'button' | 'ul' | 'li' | 'svg';

  type TagElement<
    Tag extends Tags
  > = JSX.IntrinsicElements[Tag] extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<infer Element>,
    infer Element
  >
    ? Element
    : void;

  export type TagAttributes<
    Tag extends Tags
  > = JSX.IntrinsicElements[Tag] extends React.DetailedHTMLProps<
    infer Attributes,
    any
  >
    ? Attributes
    : JSX.IntrinsicElements[Tag] extends React.SVGProps<infer X>
    ? React.SVGProps<X>
    : void;

  export type TagProps<Tag extends Tags = 'div'> = {
    tag?: Tag;
  } & TagAttributes<Tag> &
    React.CSSProperties & {
      scaleX?: number | string;
      scaleY?: number | string;
      translateX?: number | string;
      translateY?: number | string;
      translateZ?: number | string;
    };

  export function extract<Tag extends Tags>(
    props: TagProps<Tag>
  ): {
    tag: Tags;
    style: React.CSSProperties;
    canvasWidth?: number;
    canvasHeight?: number;
  } & TagAttributes<Tag>;
}
