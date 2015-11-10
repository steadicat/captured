import ReactDOM from 'react-dom';
import mutatis from 'mutatis';
import {createStore} from 'ducts';
import * as actions from './actions';
import {createPage} from './ui/page';

export function init(data) {
  const {get, actions: boundActions} = createStore(mutatis(data), actions);
  /* global document */
  ReactDOM.render(createPage(get, boundActions), document);
  boundActions.clientInit();
}

const Captured = {init};
export default Captured;
