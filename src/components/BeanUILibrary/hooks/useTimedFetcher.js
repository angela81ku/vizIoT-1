'use es6';

import { useEffect, useRef } from 'react';
import { useInterval } from 'UIBean/hooks/useInterval';

export const useTimedFetcher = (fetcher, delay) => {
  useInterval(fetcher, delay);

  useEffect(() => {
    fetcher();
  }, []);
};
