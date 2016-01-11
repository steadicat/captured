import React from 'react';
import {connect} from 'ducts';

const DEBUG = process.env.NODE_ENV !== 'production';

export default function component(displayName, func) {
  if (!func) {
    func = displayName;
    displayName = func.name;
  }

  if (DEBUG) {
    @connect
    class C extends React.Component {
      static displayName = displayName;

      shouldComponentUpdate() {
        return true;
      }

      render() {
        return func({...this.props, $: this.props.get});
      }
    }
    return C;
  }

  let f = function(props) {
    return func({...props, $: props.get});
  }

  f.displayName = displayName;
  f.pure = true;
  return connect(f);
}
