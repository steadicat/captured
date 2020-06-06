import * as React from 'react';

import {connect} from '../ducts';
import {Actions} from '../actions';
import {ConnectedProps} from '../ducts/connect';

export default function component<Props extends {}>(
  displayName: string,
  renderFunction: (
    props: Props & ConnectedProps<Actions> & {children?: React.ReactNode},
    ref: React.Ref<unknown>
  ) => React.ReactElement
) {
  return React.memo(connect<Actions, Props>(React.forwardRef(renderFunction)));
}
