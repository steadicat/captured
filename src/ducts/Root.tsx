import React from 'react';

const context = React.createContext({});

export default class Root extends React.Component {
  render() {
    return (
      <context.Provider value={this.props}>
        {typeof this.props.children === 'function'
          ? this.props.children()
          : this.props.children}
      </context.Provider>
    );
  }
}

export const Consumer = context.Consumer;
