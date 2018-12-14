'use es6';

import { getIn } from 'immutable';

export const selectRecentPackets = state => {
  return getIn(state, ['packets', 'packets', 'packetListing']);
};

export const selectTodaySize = state => {
  return getIn(state, ['packets', 'pushSize', 'data']);
};

export const select10MinVelocity = state => {
  return getIn(state, ['packets', '', 'data'])
};

export const selectTodayPacketCount = state => {
  return getIn(state, ['packets', 'pushPacketCount', 'data']);
};

export const selectRealtimeVelocitySample = state => {
  return getIn(state, ['packets', 'realtimeVelocitySample', 'data'])
};

export const selectRealtimeVelocitySizeSample = state => {
  return getIn(state, ['packets', 'realtimeVelocitySizeSample', 'data']);
};