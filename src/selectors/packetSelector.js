'use es6';

import { getIn } from 'immutable';

export const selectRecentPackets = state => {
  return getIn(state, ['packets', 'packets', 'packetListing']);
};

export const selectTodaySize = state => {
  return getIn(state, ['packets', 'pushSize', 'data']);
};

export const selectSize10Min = state => {
  return getIn(state, ['packets', 'pushSize10MinStore', 'data'])
};

export const selectVelocity10Min = state => {
  const size10Min = selectSize10Min(state);
  return size10Min && (size10Min / (10 * 60));
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