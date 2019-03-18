'use es6';

import { useEffect, useRef } from 'react';

export const useScroll = callback => {

  const callbackRef = useRef();

  const clearListener = () => {
    const listener = callbackRef.current;
    if (listener !== null) {
      window.removeEventListener('scroll', listener);
    }
  };

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    window.addEventListener('scroll', callback);
    return clearListener;
  }, [callback])
};


