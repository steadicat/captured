import ReactDOM from 'react-dom';
import mutatis from 'mutatis';
import {createStore} from 'ducts';
import * as actions from './actions';
import {createPage} from './ui/page';
import * as tracking from './lib/tracking';

export function init(data) {
  tracking.init();

  try {

    const {get, actions: boundActions} = createStore(mutatis(data), actions);
    /* global document */
    ReactDOM.render(createPage(get, boundActions), document);
    boundActions.clientInit();

    window.addEventListener('error', tracking.error);

    if (process.env.NODE_ENV !== 'production') {
      /* global window */
      window.get = get;
      window.actions = actions;
      /* global module */
      if (module.hot) {
        module.hot.accept();
      }
    }

  } catch (e) {
    tracking.error(e);
  }
}

const Captured = {init};
export default Captured;
