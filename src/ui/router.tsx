import {DefaultFont, PageTitle} from '../ui/type';

import {About} from '../ui/about';
import {Block} from '../stylistic-elements';
import {Home} from '../ui/home';
import {Orders} from '../ui/orders';
import React from 'react';
import {TextLink} from '../ui/core';
import component from '../lib/component';

export const Router = component('Router', ({get, actions}) => {
  //if (!get('shown')) return <Placeholder />;
  if (get('path') === '/notfound') return <NotFound />;
  if (get('path') === '/error') return <Error />;
  if (get('path') === '/orders') return <Orders />;
  if (get('path') === '/about') return <About />;
  return <Home />;
});


const NotFound = component('NotFound', () => (
  <DefaultFont>
    <Block textAlign="center">
      <PageTitle marginTop="40vh" marginBottom={96}>
        THERE’S NOTHING HERE.
      </PageTitle>
      <TextLink href="/">Go Back</TextLink>
    </Block>
  </DefaultFont>
));

const Error = component('Error', () => (
  <DefaultFont>
    <Block textAlign="center">
      <PageTitle marginTop="40vh" marginBottom={96}>
        SOMETHING BROKE.
      </PageTitle>
      <TextLink href="/">Go Home</TextLink>
    </Block>
  </DefaultFont>
));
