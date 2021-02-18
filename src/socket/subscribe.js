'use es6';

import openSocket from 'socket.io-client';
import { baseUrl } from '../constants/RequestConstants';

export const url = `${baseUrl}/chat`;

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

  // added this to see whats coming in
  socket.on('chat message', (msg) => {
    console.log(msg);
  })

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

export const CountRoom = '/total/count/1s';
export const SizeRoom = '/total/size/1s';
export const TodayCountRoom = '/total/count';
export const TodaySizeRoom = '/total/size';
export const Size1MinRoom = '/total/size/1min';
export const IndividualSizeRoom = '/individual/size/1s';
export const ByDeviceSizeRoomToday = '/individual/size';