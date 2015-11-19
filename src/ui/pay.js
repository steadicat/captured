import React from 'react';
import superagent from 'superagent';
import component from '../lib/component';
import * as script from '../lib/script';
import {Button} from '../ui/core';
import config from '../../etc/config';

let handler;

function onClick(get, actions, event) {
  event.stopPropagation();
  actions.stripeDialogRequested();
  script.load('https://checkout.stripe.com/checkout.js', function() {
    /* global require */
    !handler && (handler = require('StripeCheckout').configure({
      key: config.STRIPE_KEY,
      token: function(token, args) {
        superagent
          .post(`${config.API_URL}/pay`)
          .send({token, args})
          .end((err, res) => {
            if (err) return console.warn(err);
            actions.purchaseCompleted();
          });
      },
    }));
    handler.open({
      name: 'Captured',
      description: `Buy copy ${get('sold') + 1} of ${get('total')}. Free shipping.`,
      amount: get('price') * 100,
      allowRememberMe: false,
      shippingAddress: true,
      opened: actions.stripeDialogShown,
      closed: actions.stripeDialogHidden,
    });
  });
};

export const Pay = component('Pay', ({get, actions, children, ...props}) => (
  <Button onClick={onClick.bind(this, get, actions)} {...props}>
    {get('stripeDialogRequested') && !get('stripeDialogShown') ? '...' : children}
  </Button>
));


