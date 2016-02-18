import ReactDOM from 'react-dom';
import mutatis from 'mutatis';
import {createStore} from 'ducts';
import * as actions from './actions';
import {createPage, createBody} from './ui/page';
import * as tracking from './lib/tracking';

export function init(data) {
  try {

    const {get, actions: boundActions} = createStore(mutatis(data), actions);

    /* global document */
    try {
      ReactDOM.render(createPage(get, boundActions), document);
    } catch (e) {
      tracking.error(new Error(`Full-page render failed (${e.message || e})`));

      // Recover from failed full-page render
      document.body.innerHTML = '';
      const wrapper = document.createElement('div');
      document.body.appendChild(wrapper);
      ReactDOM.render(createBody(get, boundActions), wrapper);
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
