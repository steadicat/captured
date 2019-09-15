import React, {forwardRef} from 'react';

import ReactDOM from 'react-dom';
import {connect} from '../ducts';
import {getWindowScrollY} from './scroll';

export function hover(Component) {
  class Hover extends React.Component {
    constructor(props) {
      super(props);
      this.state = {hovered: false};
    }

    onMouseEnter = () => {
      this.setState({hovered: true});
    };

    onMouseLeave = () => {
      this.setState({hovered: false});
    };

    shouldComponentUpdate() {
      if (this.props.animating === true) return false;
      return true;
    }

    render() {
      const {forwardedRef, ...props} = this.props;
      return (
        <Component
          {...props}
          hovered={this.state.hovered}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          ref={forwardedRef}
        />
      );
    }
  }

  return forwardRef((props, ref) => {
    return <Hover {...props} forwardedRef={ref} />;
  });
}

export function track(Component) {
  class Track extends React.Component {
    componentDidMount() {
      this.componentDidUpdate();
    }

    componentDidUpdate() {
      const {trackKey, actions} = this.props;
      const node = ReactDOM.findDOMNode(this);
      const {top, bottom} = node.getBoundingClientRect();
      const scrollY = getWindowScrollY();
      actions.positionElement(trackKey, {
        top: scrollY + top,
        bottom: scrollY + bottom
      });
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return connect(Track);
}
