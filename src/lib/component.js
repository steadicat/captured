import {connect} from 'ducts';

export default function component(displayName, func) {
  if (!func) {
    func = displayName;
    displayName = func.name;
  }

  return connect(function(props) {
    return func({...props, $: props.get});
  });
}
