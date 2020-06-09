import * as React from 'react';
import * as script from '../lib/script';

import {Block} from '../stylistic-elements';
import {Button} from '../ui/core';
import config from '../../config';
import {connect} from '../ducts';
import superagent from 'superagent';

class PayClass extends React.Component {
  componentDidMount() {
    script.load('https://checkout.stripe.com/checkout.js');
  }

  onClick = (event) => {
    const {get, actions} = this.props;
    event.stopPropagation();
    actions.stripeDialogRequested();
    script.load('https://checkout.stripe.com/checkout.js', function () {
      /* global require */
      const handler = require('StripeCheckout').configure({
        key: config.STRIPE_KEY,
        token: function (token, args) {
          superagent
            .post(`${config.API_URL}/pay`)
            .send({token, args})
            .end((err, res) => {
              if (err) {
                if (
                  err.response &&
                  err.response.body &&
                  err.response.body.ok === false
                ) {
                  alert(err.response.body.message);
                } else {
                  alert(err);
                }
                return console.warn(err);
              }
              actions.purchaseCompleted();
            });
        },
      });
      handler.open({
        name: get('sold') >= 1000 ? 'Join the Waitlist' : 'Buy the Book',
        description:
          get('sold') >= 1000
            ? 'Billed if copies become available.'
            : `Copy ${get('sold') + 1} of ${get('total')}. Free shipping.`,
        amount: get('price') * 100,
        allowRememberMe: false,
        shippingAddress: true,
        opened: actions.stripeDialogShown,
        closed: actions.stripeDialogHidden,
      });
    });
  };

  render() {
    const {get, actions, children, forwardedRef, ...props} = this.props;
    return (
      <Button
        borderColor="#444"
        borderStyle="solid"
        borderWidth={1}
        onClick={this.onClick}
        {...props}
        ref={forwardedRef}
      >
        <Block
          visibility={
            get('stripeDialogRequested') && !get('stripeDialogShown')
              ? 'hidden'
              : null
          }
        >
          {children}
        </Block>
        {get('stripeDialogRequested') && !get('stripeDialogShown') && (
          <Block
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            fontSize={28}
            lineHeight={32}
          >
            ...
          </Block>
        )}
      </Button>
    );
  }
}

export const Pay = connect(
  React.forwardRef((props, ref) => <PayClass {...props} forwardedRef={ref} />)
);
