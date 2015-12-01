import React from 'react';
import ReactDOM from 'react-dom';
import throttle from '../lib/throttle';
import raf from 'raf';

export class Scroll extends React.Component {
  static defaultProps = {
    margin: 200,
  }

  constructor() {
    super();
    this.state = {
      screenBottom: 1000,
      rendered: 0,
    };
  }

  componentDidMount() {
    /* global window */
    window.addEventListener('scroll', this.onScroll);
    this.batchRenderChildren();
  }

  /*
  shouldComponentUpdate(nextProps, nextState) {
    const firstOnScreen = this.getFirstOnScreen(nextProps, nextState);
    const should = this.lastFirstOnScreen !== firstOnScreen;
    this.lastFirstOnScreen = firstOnScreen;
    return should;
  }
  */

  componentDidUpdate() {
    this.batchRenderChildren();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    this.batchRenderChildren();
  }

  batchRenderChildren = () => {
    if (this.state.rendered >= this.props.data.length) return;
    clearTimeout(this.batchRenderTimeout);
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    let delay = 1000;
    if (rect.bottom < window.scrollY + window.innerHeight) {
      delay = 0;
    }
    this.batchRenderTimeout = setTimeout(this.renderChildren, delay);
  }

  renderChildren = () => {
    this.setState({rendered: this.state.rendered + 1});
  }

  render() {
    const {data, children: childGen} = this.props;
    const {rendered} = this.state;

    return (
      <div>
        {data.slice(0, rendered).map(childGen)}
      </div>
    );
  }
}
/*

const items = [
  {color: '#fc0', height: 100},
  {color: '#cff', height: 150},
  {color: '#3cf', height: 50},
  {color: '#f96', height: 75},
  {color: '#96c', height: 175},
  {color: '#fc0', height: 100},
  {color: '#cff', height: 150},
  {color: '#3cf', height: 50},
  {color: '#f96', height: 75},
  {color: '#96c', height: 175},
  {color: '#fc0', height: 100},
  {color: '#cff', height: 150},
  {color: '#3cf', height: 50},
  {color: '#f96', height: 75},
  {color: '#96c', height: 175},
  {color: '#fc0', height: 100},
  {color: '#cff', height: 150},
  {color: '#3cf', height: 50},
  {color: '#f96', height: 75},
  {color: '#96c', height: 175},
  {color: '#fc0', height: 100},
  {color: '#cff', height: 150},
  {color: '#3cf', height: 50},
  {color: '#f96', height: 75},
  {color: '#96c', height: 175},
  {color: '#fc0', height: 100},
  {color: '#cff', height: 150},
  {color: '#3cf', height: 50},
  {color: '#f96', height: 75},
  {color: '#96c', height: 175},
  {color: '#fc0', height: 100},
  {color: '#cff', height: 150},
  {color: '#3cf', height: 50},
  {color: '#f96', height: 75},
  {color: '#96c', height: 175},
  {color: '#fc0', height: 100},
  {color: '#cff', height: 150},
  {color: '#3cf', height: 50},
  {color: '#f96', height: 75},
  {color: '#96c', height: 175},
  {color: '#fc0', height: 100},
  {color: '#cff', height: 150},
  {color: '#3cf', height: 50},
  {color: '#f96', height: 75},
  {color: '#96c', height: 175},
  {color: '#fc0', height: 100},
  {color: '#cff', height: 150},
  {color: '#3cf', height: 50},
  {color: '#f96', height: 75},
  {color: '#96c', height: 175},
  {color: '#fc0', height: 100},
  {color: '#cff', height: 150},
  {color: '#3cf', height: 50},
  {color: '#f96', height: 75},
  {color: '#96c', height: 175},
  {color: '#fc0', height: 100},
  {color: '#cff', height: 150},
  {color: '#3cf', height: 50},
  {color: '#f96', height: 75},
  {color: '#96c', height: 175},
  {color: '#fc0', height: 100},
  {color: '#cff', height: 150},
  {color: '#3cf', height: 50},
  {color: '#f96', height: 75},
  {color: '#96c', height: 175},
];


class Box extends React.Component {
  render() {
    const {height, color, style} = this.props;
    return (
      <div style={{height: height, width: '100%', background: color, ...style}}></div>
    );
  }
}

export class ScrollTest extends React.Component {
  render() {
    return (
      <div>
        <Scroll data={items}>
          {(item, i) => <Box key={i} color={item.color} height={item.height} />}
        </Scroll>
      </div>
    );
  }
}
*/
