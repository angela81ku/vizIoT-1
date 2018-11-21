'use es6';

import { createReducer } from 'redux-act';
import {
  recentsActionBundle,
  pushPacketCountToday
} from 'VizIoT/actions/packetActions';
import { combineReducers } from 'redux';
import { createRequestReducer } from 'VizIoT/reducers/requests/requestState';

const isMocking = true;
const genMock = count => ({
      src_ip: 'src_ip',
      dst_ip: 'dest_ip',
      dst_mac: 'src_mac',
      src_mac: 'dest_mac',
      dst_port: 'dst_port',
      src_port: 'src_port',
      timestamp: `${count} timestamp`,
    });

const pushPacketCount = createReducer({
    [pushPacketCountToday]: (state, newCount) => {
      return {
        ...state,
        countToday: newCount,
      }
    },
  },
  { countToday: null }
);

const middleware = (state, rawRequestData) => {
  const { payload, requestBody } = rawRequestData;
  const { packetListing: prevPacketListing } = state;

  const packetListing = prevPacketListing || [];
  if (isMocking) {
    return {
      packetListing: [
        genMock(packetListing.length),
        ...packetListing,
      ]
    };
  }

  return {
    packetListing: payload,
  };
};

const packets = createRequestReducer(
  { packetListing: null },
  recentsActionBundle,
  middleware
);

export default combineReducers({
  pushPacketCount,
  packets,
});
