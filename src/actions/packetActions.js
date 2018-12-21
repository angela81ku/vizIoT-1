'use es6';

import { createAction } from 'redux-act';
import { createRequestActions } from 'VizIoT/actions/requestStatusActionFactory';

// Request actions
export const recentsActionBundle = createRequestActions('recent packets');

// Other actions
export const pushSize1Min = createAction('total size in 1 min');
export const pushSizeToday = createAction();
export const pushPacketCountToday = createAction();
export const pushRealtimeVelocitySample = createAction();
export const pushRealtimeVelocitySizeSample = createAction();

export default Object.assign(
  {},
  recentsActionBundle,
  {
    pushSize1Min,
    pushSizeToday,
    pushPacketCountToday,
    pushRealtimeVelocitySample,
    pushRealtimeVelocitySizeSample,
  });
