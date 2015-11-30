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
      screenTop: 0,
      screenBottom: 1000,
      heights: [],
    };
  }

  componentDidMount() {
    /* global window */
    window.addEventListener('scroll', this.update);
    window.addEventListener('resize', this.onResize);
    this.update();
    this.componentDidUpdate();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const firstOnScreen = this.getFirstOnScreen(nextProps, nextState);
    const should = this.lastFirstOnScreen !== firstOnScreen;
    this.lastFirstOnScreen = firstOnScreen;
    return should;
  }

  componentDidUpdate() {
    const heights = this.heightsValid ? [...this.state.heights] : [];
    let changed = false;
    for (let i = 0, l = this.props.data.length; i < l; i++) {
      const el = ReactDOM.findDOMNode(this.refs[i])
      if (!el) continue;
      if (heights[i]) continue;
      const h = el.offsetHeight;
      if (h !== heights[i]) {
        heights[i] = h;
        changed = true;
      }
    }
    this.heightsValid = changed;
    changed && this.setState({heights});
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.update);
    window.removeEventListener('resize', this.onResize);
  }
  onResize = () => {
    this.heightsValid = false;
    this.update();
  }

  update = throttle(() => {
    raf(this.updateFrame);
  }, 1000 / 15)

  updateFrame = () => {
    const elTop = ReactDOM.findDOMNode(this).offsetTop;
    this.setState({
      screenTop: window.scrollY - elTop,
      screenBottom: window.scrollY + window.innerHeight - elTop,
    });
  }

  onScreen = (i, top) => {
    if (top < 0) return false;
    const {margin} = this.props;
    const {heights, screenTop, screenBottom} = this.state;
    let height = heights[i];
    if (!height) {
      return top < screenBottom + margin;
    }
    const bottom = top + height;
    return (top < screenBottom + margin) & (bottom > screenTop - margin);
  }

  getFirstOnScreen(props, state) {
    let top = 0;
    return props.data.findIndex((item, i) => {
      const h = state.heights[i];
      if (!h) return true;
      top += h;
      return top > state.screenTop - props.margin;
    });
  }

  render() {
    const {data, children: childGen, margin} = this.props;
    const {heights, screenTop, screenBottom} = this.state;

    const knownHeights = heights.filter(h => h > 0);
    const averageHeight = knownHeights.length ? knownHeights.reduce((a, b) => a + b, 0) / knownHeights.length : 0;
    const totalHeight = averageHeight * data.length;
    const averageOnScreen = Math.ceil((2 * margin + screenBottom - screenTop) / averageHeight) + 1;
    const firstOnScreen = this.getFirstOnScreen(this.props, this.state);

    let top = 0;
    return (
      <div style={{minHeight: totalHeight, position: 'relative'}}>
        {data.map((item, i) => {
          if ((i < firstOnScreen) || (i >= firstOnScreen + averageOnScreen)) {
            top += heights[i];
            return null;
          }

          if (top >= 0 && heights[i]) {
            top += heights[i];
          } else {
            top = -1;
          }
          return React.cloneElement(childGen(item, i), {
            ref: i,
            style: {
              top: top - (heights[i] || 0),
              position: top > 0 ? 'absolute' : null,
            },
          });
        }).filter(item => item !== null)}
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
          {(item, i) => <Box color={item.color} height={item.height} />}
        </Scroll>
      </div>
    );
  }
}
*/
