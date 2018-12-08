'use es6';

import { getIn } from 'immutable';

export const selectRecentPackets = state => {
  return getIn(state, ['packets', 'packets', 'packetListing']);
};

export const selectTodayPacketCount = state => {
  return getIn(state, ['packets', 'pushPacketCount', 'data']);
};

export const selectRealtimeVelocitySamples = state => {
  return getIn(state, ['packets', 'realtimeVelocitySamples', 'data'])
};