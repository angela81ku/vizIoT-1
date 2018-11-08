'use es6';

import openSocket from 'socket.io-client';

const host = 'https://viziot-server-2.herokuapp.com/';
const url = `${host}chat`;

let socket;

export const createSocket = () => {
  socket = openSocket.connect(url);
  socket.on('connect', () => {
    console.log('connected!');
  });

  socket.on('connect_error', error => {
    console.log('connect_error');
    console.log(error);
  });

  socket.on('connect_timeout', (timeout) => {
    console.log('connect_timeout');
    console.log(timeout);
  });
};

export const closeSocket = () => {
  socket.disconnect();
};

export const subscribeToTopic = (topic, callback) => {
  socket.on(topic, timestamp => callback(null, timestamp));
};