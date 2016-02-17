import React from 'react';
import superagent from 'superagent';
import {connect} from 'ducts';
import * as script from '../lib/script';
import {Block} from 'stylistic-elements';
import {Button} from '../ui/core';
import config from '../../etc/config';

if (typeof document !== 'undefined') {
  script.load('https://checkout.stripe.com/checkout.js');
}

let handler;

@connect
export class Pay extends React.Component {

  onClick = (event) => {
    const {get, actions} = this.props;
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
        name: 'Buy the Book',
        description: `Copy ${get('sold') + 1} of ${get('total')}. Free shipping.`,
        amount: get('price') * 100,
        allowRememberMe: false,
        shippingAddress: true,
        opened: actions.stripeDialogShown,
        closed: actions.stripeDialogHidden,
      });
    });
  };

  render() {
    const {get, actions, children, ...props} = this.props;
    return (
      <Button onClick={this.onClick} {...props}>
        <Block visibility={get('stripeDialogRequested') && !get('stripeDialogShown') ? 'hidden' : null}>
          {children}
        </Block>
        {get('stripeDialogRequested') && !get('stripeDialogShown') && <Block
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          fontSize={28}
          lineHeight={32}>
          ...
        </Block>}
      </Button>
    );
  }
}


