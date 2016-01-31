import React from 'react';
import {Animate} from 'react-rebound';
import {InlineBlock} from 'stylistic-elements';
import {connect} from 'ducts';
import config from '../../etc/config';

function getImageOptions(get, w, h) {
  const ratio = get('browser.pixelRatio');
  const webp = get('browser.webp');
  return `w${w * ratio}-h${h * ratio}-p${webp ? '-rw' : ''}`;
}

@connect
export class Image extends React.Component {

  constructor() {
    super();
    this.state = {loaded: false};
  }

  static pure = true;

  onLoad = () => {
    this.setState({loaded: true});
  };

  render() {
    const {src, width, height, pxWidth, pxHeight, get, actions, ...props} = this.props;
    const url = `${config.IMAGES[src]}=${getImageOptions(get, pxWidth || width, pxHeight || height)}`;
    return (
      <Animate opacity={this.props.opacity !== undefined ? this.props.opacity : (this.state.loaded ? 1 : 0)}>
        <InlineBlock
          tag="img"
          src={url}
          onLoad={this.onLoad}
          translateZ={0}
          width={width}
          height={height}
          opacity={this.props.opacity || 0}
          {...props}
        />
      </Animate>
    );
  }

}
