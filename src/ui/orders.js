import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'ducts';
import {Block} from 'stylistic-elements';
import component from '../lib/component';
import {DefaultFont, PageHeading, BoldText, Text, LightCondensedText} from '../ui/type';
import {Column} from '../ui/layout';
import {MainButton, Input, Button} from '../ui/core';

const StatusSelector = component('StatusSelector', ({get, actions, status, ...props}) =>
  <Button
    fontWeight="bold"
    borderWidth={0}
    padding={6}
    color={get('orderStatus') === status ? [238, 85, 34] : '#000'}
    onClick={() => actions.selectOrders(status)}
    {...props}
  />
);

const Message = component('Message', (props) =>
  <Block textAlign="center" {...props} padding={48} />);

const AdminButton = component('AdminButton', (props) =>
  <MainButton
    paddingTop={7}
    paddingBottom={6}
    paddingLeft={12}
    paddingRight={12}
    {...props}
  />
);

class Tracking extends React.Component {
  static pure = true;

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onShipped(ReactDOM.findDOMNode(this.input).value);
  };

  render() {
    const {onShipped, ...props} = this.props;
    return (
      <Block tag="form" onSubmit={this.onSubmit} {...props}>
        <Input padding={4} label="Tracking number" ref={node => this.input = node} marginRight={6} />
        <AdminButton tag="button" type="submit">Mark Shipped</AdminButton>
      </Block>
    );
  }
}

const Order = component('Order', ({order: {id, created, status, shipping: {name, address}, customer, metadata}, get, actions}) =>
  <Block marginBottom={12}>
    <Column width="20%">
      <LightCondensedText fontSize={12}>{new Date(created * 1000).toLocaleString()}</LightCondensedText>
    </Column>
    <Column width="40%">
      <BoldText>{name}</BoldText>
      <Text>{address.line1}</Text>
      <Text>{address.city}, {address.state} {address.postal_code} </Text>
    </Column>
    <Column width="40%">
      {status === 'created' && <AdminButton onClick={() => actions.chargeOrder(id, customer.id)}>
        Charge
      </AdminButton>}
      {status === 'charging' && <AdminButton>...</AdminButton>}
      {status === 'paid' && <Tracking onShipped={(tracking) => actions.shipOrder(id, tracking)} />}
      {status === 'fulfilled' && <Block>
        Shipped: {metadata.tracking_number}
      </Block>}

    </Column>
  </Block>
);

@connect
export class Orders extends React.Component {

  componentDidMount() {
    this.props.actions.fetchOrders();
  }

  static pure = true;

  render() {
    const {get} = this.props;
    return (
      <DefaultFont>
        <Block padding={24}>
          <PageHeading textAlign="center" marginTop={24} marginBottom={24}>Orders</PageHeading>
          <Block textAlign="center" marginBottom={48}>
            <StatusSelector status="created">New</StatusSelector>
            <StatusSelector status="paid">Paid</StatusSelector>
            <StatusSelector status="fulfilled">Shipped</StatusSelector>
            <StatusSelector status="all">All</StatusSelector>
          </Block>
          {get('ordersLoading') && <Message>Loading...</Message>}
          {get('orders').values().map(order => <Order key={order.id} order={order} />)}
          {!get('ordersLoading') && !get('orders').size && <Message>Nothing to show.</Message>}
        </Block>
      </DefaultFont>
    );
  }
}
