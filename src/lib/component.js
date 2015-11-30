import {connect} from 'ducts';

export default function component(displayName, func) {
  if (!func) {
    func = displayName;
    displayName = func.name;
  }

  const f = function(props) {
    return func({...props, $: props.get});
  }
  f.pure = true;
  return connect(f);
}
