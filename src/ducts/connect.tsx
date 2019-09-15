import * as React from 'react';

import {context} from './Root';

let DEBUG = false;
export function enableRenderLogging(enabled = true) {
  DEBUG = enabled;
}

export default function connect(Component) {
  function Connect({forwardedRef, ...props}) {
    const {get, actions} = React.useContext(context);

    const [, setState] = React.useState({});
    const update = React.useCallback(() => {
      setState({});
    }, []);
    const getWithSubscriber = React.useCallback(
      (key, defaultValue, subscriber = update) =>
        get(key, defaultValue, subscriber),
      []
    );

    React.useEffect(() => {
      return () => get.unsubscribe(update);
    }, [get, update]);

    return (
      <Component
        {...props}
        get={getWithSubscriber}
        actions={actions}
        ref={forwardedRef}
      />
    );
  }

  const displayName =
    Component.displayName || Component.name || 'StatelessComponent';

  Connect.displayName = `Connect(${displayName})`;

  return React.forwardRef((props, ref) => {
    return <Connect {...props} forwardedRef={ref} />;
  });
}
