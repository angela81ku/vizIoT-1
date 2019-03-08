'use es6';

import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import SocketContext from 'UIBean/context/SocketContext';

export default class SocketProvider extends Component {
  constructor(props) {
    super(props);
    this.socket = openSocket(props.url);
    console.log('socket opened SocketProvider');

  }

  componentWillUnmount() {
    console.log('socket dismounted SocketProvider');
    this.socket.disconnect();
  }

  render() {
    return (
      <SocketContext.Provider value={this.socket}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}