'use es6';

import hash from 'object-hash';

export const getDataKey = configObject => {
  let hashValue = hash(Object.values(configObject), { unorderedArrays: true });
  if (configObject.selectionMode === 'COMBINED') {
    // debugger;
    console.log(`the hash = ${hashValue}`);
  }
  return hashValue;
};
