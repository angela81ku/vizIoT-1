'use es6';

import { createAction } from 'redux-act';
import { buildRequestActions } from 'VizIoT/actions/requestStatusActionFactory';

// Request actions
export const recentsActionBundle = buildRequestActions();

// Other actions
export const pushPacketCountToday = createAction();

export default Object.assign(
  {},
  recentsActionBundle,
  {
    pushPacketCountToday,
  });
