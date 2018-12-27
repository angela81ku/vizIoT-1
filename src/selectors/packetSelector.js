'use es6';

import { getIn } from 'immutable';

export const selectRecentPackets = state => {
  return getIn(state, ['packets', 'packets', 'packetListing']);
};

export const selectTodaySize = state => {
  return getIn(state, ['packets', 'pushSize', 'data']);
};

export const selectSize1Min = state => {
  return getIn(state, ['packets', 'pushSize1MinStore', 'data'])
};

export const selectVelocity1Min = state => {
  const size10Min = selectSize1Min(state);
  return size10Min && (size10Min / 60.0);
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

export const deviceToLiveSamples = state => {
  return getIn(state, ['packets', 'realtimeIndividualVelocitySizeSample', 'data']);
};
