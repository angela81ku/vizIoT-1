'use es6';

import { useCallback, useState } from 'react';

export const useInputValue = (initialValue, externalCallback = () => {}) => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback(e => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    externalCallback(e);
    setValue(value);
  }, [externalCallback]);

  return {value, onChange};
};
