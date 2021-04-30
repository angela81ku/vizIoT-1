'use es6';

import {useEffect, useRef} from 'react';

export const useInterval = (callback, delay) => {
  const intervalTimerRef = useRef();
  const savedCallback = useRef();

  const clearTimer = () => {
    const timer = intervalTimerRef.current;
    if (timer !== null) {
      clearInterval(timer);
    }
  };

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      intervalTimerRef.current = setInterval(savedCallback.current, delay);
    }
    return clearTimer;
  }, [delay]);
};
