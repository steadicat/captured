import React from 'react';
import {connect} from 'ducts';
import {Block} from 'stylistic-elements';
import {linear} from '../lib/math';

function distance(a, b) {
  return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]));
}

function midPoint(a, b) {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function zoomBucket(zoom) {
  if (zoom > 2.5) return 4;
  if (zoom > 1.5) return 2;
  return 1;
}

function zoomPx(zoom, px, original) {
  return Math.min(zoomBucket(zoom) * px, original);
}

@connect
export class Zoom extends React.Component {

  constructor() {
    super();
    this.state = {loaded: false, hover: null, zoom: 1, dx: 0, dx: 1};
  }

  onMouseMove = (event) => {
    this.setState({hover: [event.clientX, event.clientY]})
  };

  onMouseLeave = (event) => {
    this.setState({hover: null});
  };

  onTouchMove = (event) => {
    if (event.touches.length === 2) {
      const a1 = [event.touches.item(0).clientX, event.touches.item(0).clientY];
      const b1 = [event.touches.item(1).clientX, event.touches.item(1).clientY];
      if (this.previousTouches) {
        const [a0, b0] = this.previousTouches;
        const m0 = midPoint(a0, b0);
        const m1 = midPoint(a1, b1);
        this.setState({
          zoom: this.state.zoom * distance(a1, b1) / distance(a0, b0),
          dx: this.state.dx + m1[0] - m0[0],
          dy: this.state.dy + m1[1] - m0[1],
        });
      }
      this.previousTouches = [a1, b1];
    } else if (this.previousTouches) {
      this.onTouchEnd()
    }
  };

  onTouchEnd = () => {
    this.previousTouches = null;
  };

  onLoad = () => {
    this.setState({loaded: true});
  };

  render() {
    const {children, width, height, pxWidth, pxHeight, originalWidth, originalHeight, get, ...props} = this.props;
    const {hover, loaded, zoom, dx, dy} = this.state;
    const image = React.Children.only(children);

    const w = get('browser.width');

    return (
      <Block
        position="relative"
        overflow="hidden"
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        height={height}
        {...props}>
        {/*image*/}
        {React.cloneElement(image, {
          width: hover ? originalWidth : width,
          height: hover ? originalHeight : height,
          pxWidth: (hover && loaded) ? originalWidth : zoomPx(zoom, pxWidth, originalWidth),
          pxHeight: (hover && loaded) ? originalHeight : zoomPx(zoom, pxHeight, originalHeight),
          top: 0,
          left: hover ? 0 : '50%',
          translateX: hover ? linear(0, 0, w, w - originalWidth, hover[0]) : (-width / 2 + dx),
          translateY: hover ? linear(0, 0, height, - originalHeight + height, hover[1]) : dy,
          translateZ: (zoom !== 1) ? null : 0,
          onLoad: this.onLoad,
          scaleX: zoom,
          scaleY: zoom,
        })}
      </Block>
    );
  }
}
