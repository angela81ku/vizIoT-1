'use es6';

import openSocket from 'socket.io-client';

const host = 'https://viziot-server-2.herokuapp.com/';
const url = `${host}chat`;

// Socket instance

// Debugging flags
const enableFlag = true;


export const createSocket = customUrl => {

  const connectUrl = customUrl || url;
  if (!enableFlag) {
    return;
  }
  // debugger
  const socket = openSocket.connect(connectUrl);
  socket.on('connect', () => {
    console.log(`connected: ${connectUrl}`);
  });

  socket.on('connect_error', error => {
    console.log('connect_error');
    console.log(error);
  });

  socket.on('connect_timeout', (timeout) => {
    console.log('connect_timeout');
    console.log(timeout);
  });

  socket.on('disconnect', function () {
    console.log(`disconnected: ${connectUrl}`);
  });

  return socket;
};

export const CountRoom = '/total/count/500ms';
export const TodayCountRoom = '/total/count';