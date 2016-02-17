import React from 'react';
import component from '../lib/component';
import {Orders} from '../ui/orders';
import {About} from '../ui/about';
import {Home} from '../ui/home';

export const Router = component('Router', ({get}) => {
  //if (!get('shown')) return <Placeholder />;
  if (get('path') === '/orders') return <Orders />;
  if (get('path') === '/about') return <About />;
  return <Home />;
});

/*

import {Block} from 'stylistic-elements';
import {DefaultFont, PageSubtitle} from '../ui/type';

const Placeholder = component('Placeholder', () =>
  <DefaultFont>
    <Block>
      <PageSubtitle textAlign="center" marginTop={96}>
        Coming Soon.
      </PageSubtitle>
    </Block>
  </DefaultFont>
);
*/
