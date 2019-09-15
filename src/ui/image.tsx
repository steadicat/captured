import {Animate} from '../react-rebound';
import {InlineBlock} from '../stylistic-elements';
import React from 'react';
import config from '../../config';
import {connect} from '../ducts';

function getImageOptions(get, w, h) {
  const ratio = get('browser.pixelRatio');
  const webp = get('browser.webp');
  return `w${w * ratio}-h${h * ratio}-p${webp ? '-rw' : ''}`;
}

class ImageClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
  }

  onLoad = () => {
    this.setState({loaded: true});
    this.props.onLoad && this.props.onLoad();
  };

  render() {
    const {
      src,
      width,
      height,
      pxWidth,
      pxHeight,
      get,
      actions,
      forwardedRef,
      ...props
    } = this.props;
    const url = `${config.IMAGES[src]}=${getImageOptions(
      get,
      pxWidth || width,
      pxHeight || height
    )}`;
    return (
      <Animate
        opacity={
          this.props.opacity !== undefined
            ? this.props.opacity
            : this.state.loaded
            ? 1
            : 0
        }
      >
        <InlineBlock
          ref={forwardedRef}
          tag="img"
          src={url}
          width={width}
          height={height}
          opacity={this.props.opacity || 0}
          {...props}
          onLoad={this.onLoad}
        />
      </Animate>
    );
  }
}

export const Image = connect(
  React.forwardRef((props, ref) => <ImageClass {...props} forwardedRef={ref} />)
);
