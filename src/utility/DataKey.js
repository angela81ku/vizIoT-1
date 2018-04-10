'use es6';

import hash from 'object-hash';

export const getDataKey = configObject => {
  return hash(Object.values(configObject), { unorderedArrays: true });
};
