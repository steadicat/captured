import * as React from 'react';

import {context} from './Root';
import {Get} from '../actions';

let DEBUG = false;
export function enableRenderLogging(enabled = true) {
  DEBUG = enabled;
}

export type ConnectedProps<Actions extends {} = {}> = {
  get: Get;
  actions: Actions;
};

export default function connect<Actions, Props extends {}>(
  Component: React.ComponentType<
    Props & ConnectedProps<Actions> & {children?: React.ReactNode}
  >
) {
  const Connect = React.forwardRef(function Connect(props: Props, ref) {
    const {get, actions} = React.useContext(context) as ConnectedProps<Actions>;

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
        ref={ref}
      />
    );
  });

  const displayName =
    Component.displayName || Component.name || 'StatelessComponent';

  Connect.displayName = `Connect(${displayName})`;

  return React.forwardRef((props, ref) => {
    return <Connect {...props} ref={ref} />;
  });
}
