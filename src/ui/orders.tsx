import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'ducts';
import {Block} from 'stylistic-elements';
import component from '../lib/component';
import {DefaultFont, PageHeading, BoldText, Text, LightCondensedText} from '../ui/type';
import {Column} from '../ui/layout';
import {MainButton, Button, Input} from '../ui/core';

const StatusSelector = component('StatusSelector', ({get, actions, status, ...props}) =>
  <Button
    fontWeight="bold"
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

function pad(n, length = 2) {
  if (('' + n).length >= length) return '' + n;
  return '0' + pad(n, length - 1);
}

function formatDate(date) {
  const d = new Date(date * 1000);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${pad(d.getMinutes())}`
}

const Order = component('Order', ({order: {id, created, status, shipping: {name, address}, customer, metadata}, get, actions}) =>
  <Block marginBottom={12}>
    <Column width="20%">
      <LightCondensedText fontSize={12}>{formatDate(created)}</LightCondensedText>
    </Column>
    <Column width="40%">
      <BoldText>{name}</BoldText>
      <Text>{address.line1}</Text>
      <Text>{address.city}, {address.state} {address.postal_code} </Text>
      <Text>{address.country}</Text>
      {Object.entries(metadata).filter(key => key !== 'tracking_number').map(([key, value]) =>
        <Block key={key} color="#e52">
          <strong>{key}</strong>: {value}
        </Block>)}
    </Column>
    <Column width="40%">
      {status === 'created' && <AdminButton onClick={() => actions.chargeOrder(id, customer.id)}>
        Charge
      </AdminButton>}
      {status === 'charging' && <AdminButton>...</AdminButton>}
      {status === 'failed' && <Block color="#e52" fontWeight="BOLD">DECLINED</Block>}
      {status === 'canceled' && <Block color="#e52" fontWeight="BOLD">CANCELED</Block>}
      {status === 'paid' && <Tracking onShipped={(tracking) => actions.shipOrder(id, tracking)} />}
      {status === 'fulfilled' && <Block>
        Shipped: {metadata.tracking_number}
      </Block>}

    </Column>
  </Block>
);

/* global window, setTimeout, clearTimeout */

@connect
export class Orders extends React.Component {

  componentDidMount() {
    this.props.actions.fetchOrders();
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
    clearTimeout(this.timeout);
  }

  onScroll = () => {
    if (this.timeout) return;
    this.timeout = setTimeout(this.fetchMore, 1000);
  };

  fetchMore = () => {
    this.timeout = null;
    const el = ReactDOM.findDOMNode(this);
    if (el.offsetTop + el.offsetHeight <= window.scrollY + window.innerHeight * 1.5) {
      this.props.actions.fetchOrders(this.props.get('orders').last().id);
    }
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
          {get('orders').values().map(order => <Order key={order.id} order={order} />)}
          {!get('ordersLoading') && !get('orders').size && <Message>Nothing to show.</Message>}
          {get('ordersLoading') && <Message>Loading...</Message>}
        </Block>
      </DefaultFont>
    );
  }
}
