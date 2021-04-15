'use es6';

import {useRef, useContext, useEffect,} from 'react';
import SocketContext from 'UIBean/context/SocketContext';

export const useSocket = (roomPath, callback) => {
  const socket = useContext(SocketContext);
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    socket.on(roomPath, callbackRef.current);
    return () => {
      socket.removeListener(roomPath, callbackRef.current)
    }
  }, [roomPath, socket])
};