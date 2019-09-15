import * as actions from './actions';
import * as tracking from './lib/tracking';

import ReactDOM from 'react-dom';
import {createPage} from './ui/page';
import {createStore} from './ducts';
import mutatis from 'mutatis';

export function init(data) {
  try {
    const {get, actions: boundActions} = createStore(mutatis(data), actions);

    /* global document */
    try {
      ReactDOM.render(createPage(get, boundActions), document);
    } catch (e) {
      tracking.error(new Error(`Full-page render failed (${e.message || e})`));
    }

    boundActions.clientInit();

    tracking.init();
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
    if (process.env.NODE_ENV !== 'production') {
      throw e;
    } else {
      tracking.error(e);
    }
  }
}

const Captured = {init};
export default Captured;
