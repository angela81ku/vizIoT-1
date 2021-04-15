'use es6';

import {useEffect} from 'react';
import {useInterval} from 'UIBean/hooks/useInterval';

export const useTimedFetcher = (fetcher, delay) => {
  useInterval(fetcher, delay);

  useEffect(() => {
    fetcher();
  }, [fetcher]);
};
