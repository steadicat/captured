import * as React from 'react';

import {connect} from '../ducts';

export default function component(displayName, renderFunction) {
  if (!renderFunction) {
    renderFunction = displayName;
    displayName = renderFunction.name;
  }
  const component = (props, ref) => renderFunction({...props, ref});
  component.displayName = displayName;
  return React.memo(connect(React.forwardRef(component)));
}
