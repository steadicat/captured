import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'ducts';

export function hover(Component) {
  return class Hover extends React.Component {
    constructor() {
      super();
      this.state = {hovered: false};
    }

    static pure = true;

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
      return (
        <Component
          {...this.props}
          hovered={this.state.hovered}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        />
      );
    }
  };
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
      /* global window */
      actions.positionElement(trackKey, {
        top: window.scrollY + top,
        bottom: window.scrollY + bottom,
      });
    }

    static pure = true;

    render() {
      return <Component {...this.props} />;
    }
  }

  return connect(Track);
}
