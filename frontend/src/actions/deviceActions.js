'use es6';

import {createRequestActions} from 'VizIoT/actions/requestStatusActionFactory';

// Action bundles
export const deviceActionBundle = createRequestActions('device');

export default Object.assign(
  {},
  deviceActionBundle,
);
