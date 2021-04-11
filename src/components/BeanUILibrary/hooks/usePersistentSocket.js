'use es6';

import { useRef, useContext, useEffect, } from 'react';
import SocketContext from 'UIBean/context/SocketContext';

export const usePersistentSocket = (roomPath, callback) => {
  const socket = useContext(SocketContext);
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {

    socket.removeListener(roomPath, callbackRef.current)
    socket.on(roomPath, callbackRef.current);

  }, [roomPath, socket])
};