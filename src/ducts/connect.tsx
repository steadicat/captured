import * as React from 'react';

import {Consumer, context} from './Root';

/* global console */
let DEBUG = true;

export function enableRenderLogging(enabled = true) {
  DEBUG = enabled;
}

export default function connect(Component) {
  function Connect(props) {
    const {get, actions} = React.useContext(context);

    const [, setState] = React.useState({});
    const update = React.useCallback(() => {
      setState({});
    }, []);
    const getRef = React.useCallback(
      (key, defaultValue, subscriber = update) =>
        get(key, defaultValue, subscriber),
      []
    );

    React.useEffect(() => {
      return () => get.unsubscribe(update);
    }, [get, update]);

    return <Component {...props} get={getRef} actions={actions} />;
  }

  const displayName =
    Component.displayName || Component.name || 'StatelessComponent';

  Connect.displayName = `Connect(${displayName})`;

  return React.forwardRef((props, ref) => (
    <Connect {...props} forwardedRef={ref} />
  ));
}
