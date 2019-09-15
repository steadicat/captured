import * as history from '../lib/history';

import {Block} from '../stylistic-elements';
import React from 'react';
import {connect} from '../ducts';
import {linear} from '../lib/math';
import {trimPathEnd} from '../lib/strings';

function distance(a, b) {
  return Math.sqrt(
    (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])
  );
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

function getTouches(event) {
  const touches = [];
  for (let i = 0; i < event.touches.length; i++) {
    touches.push([
      event.touches.item(i).clientX,
      event.touches.item(i).clientY
    ]);
  }
  return touches;
}

export class ZoomClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false, hover: null, zoom: 1, origin: null};
    this.previousTouches = [];
  }

  componentWillMount() {
    this.setState({origin: [this.props.width / 2, this.props.height / 2]});
  }

  onMouseMove = event => {
    const bw = this.props.get('browser.width');
    const w = this.props.width;
    if (event.clientX < (bw - w) / 2 || event.clientX > bw - (bw - w) / 2) {
      this.setState({hover: null});
    } else {
      this.setState({hover: [event.clientX, event.clientY]});
    }
  };

  onMouseLeave = event => {
    this.setState({hover: null});
  };

  onTouchMove = event => {
    const touches = getTouches(event);
    if (!this.previousTouches) {
      this.previousTouches = touches;
      return;
    }
    if (touches.length !== this.previousTouches.length)
      return this.onTouchEnd();

    if (touches.length === 2) {
      const [a0, b0] = this.previousTouches;
      const [a1, b1] = touches;
      const m0 = midPoint(a0, b0);
      const m1 = midPoint(a1, b1);
      const zoom = (this.state.zoom * distance(a1, b1)) / distance(a0, b0);
      if (zoom < 0.8) {
        const href = trimPathEnd(this.props.get('path'));
        history.pushState(href);
        this.props.actions.navigate(href);
        return;
      }
      this.setState({
        zoom,
        origin: [
          this.state.origin[0] - ((m1[0] - m0[0]) * 2) / this.state.zoom,
          this.state.origin[1] - ((m1[1] - m0[1]) * 2) / this.state.zoom
        ]
      });
      event.preventDefault();
      this.previousTouches = touches;
    } else if (this.state.zoom > 1.2 && touches.length === 1) {
      const [a] = this.previousTouches;
      const [b] = touches;
      this.setState({
        origin: [
          this.state.origin[0] - ((b[0] - a[0]) * 2) / this.state.zoom,
          this.state.origin[1] - ((b[1] - a[1]) * 2) / this.state.zoom
        ]
      });
      this.previousTouches = touches;
      event.preventDefault();
    } else if (this.previousTouches) {
      this.onTouchEnd();
    }
  };

  onTouchEnd = () => {
    this.previousTouches = null;
  };

  onLoad = () => {
    this.setState({loaded: true});
  };

  render() {
    const {
      children,
      width,
      height,
      pxWidth,
      pxHeight,
      originalWidth,
      originalHeight,
      get,
      ...props
    } = this.props;
    const {hover, loaded, zoom, origin} = this.state;
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
        {...props}
      >
        {React.cloneElement(image, {
          width: hover ? originalWidth : width,
          height: hover ? originalHeight : height,
          pxWidth:
            hover && loaded
              ? originalWidth
              : zoomPx(zoom, pxWidth, originalWidth),
          pxHeight:
            hover && loaded
              ? originalHeight
              : zoomPx(zoom, pxHeight, originalHeight),
          top: 0,
          left: hover ? 0 : '50%',
          translateX: hover
            ? linear(
                (w - width) / 2,
                0,
                w - (w - width) / 2,
                w - originalWidth,
                hover[0]
              )
            : -width / 2,
          translateY: hover
            ? linear(0, 0, height, -originalHeight + height, hover[1])
            : 0,
          translateZ: zoom !== 1 ? null : 0,
          transformOrigin: origin ? origin.map(x => x + 'px').join(' ') : null,
          onLoad: this.onLoad,
          scaleX: zoom,
          scaleY: zoom
        })}
      </Block>
    );
  }
}

export const Zoom = connect(ZoomClass);
