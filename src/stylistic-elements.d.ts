import {ReactSVG} from 'react';

declare module '../stylistic-elements' {
  type Tag = keyof React.ReactHTML | keyof ReactSVG;
  type Attributes =
    | React.HTMLAttributes<HTMLDivElement>
    | React.SVGAttributes<HTMLOrSVGElement>;

  type ResetElementProps = Attributes & React.CSSProperties & {tag?: Tag};

  const ResetElement: React.JSXElementConstructor<ResetElementProps>;

  type ElementProps = Attributes & React.CSSProperties & {tag?: Tag};

  const Element: React.JSXElementConstructor<ElementProps>;

  type BlockProps = Attributes & React.CSSProperties & {tag?: Tag};
  const Block: React.JSXElementConstructor<BlockProps>;

  type InlineBlockProps = Attributes & React.CSSProperties & {tag?: Tag};

  const InlineBlock: React.JSXElementConstructor<InlineBlockProps>;

  type InlineProps = Attributes & React.CSSProperties & {tag?: Tag};

  const Inline: React.JSXElementConstructor<InlineProps>;
}
