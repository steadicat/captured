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
  if (process.env.NODE_ENV !== 'production') {
    /* global window */
    window.get = get;
    window.actions = actions;
    /* global module */
    if (module.hot) {
      module.hot.accept();
    }
  }
}

const Captured = {init};
export default Captured;
