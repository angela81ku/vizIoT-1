'use es6';

import { newPacketUrl } from 'VizIoT/constants/RequestConstants';
import { Record } from 'immutable/dist/immutable';
import { postCallWithRecord } from 'VizIoT/data/api/apiUtils';

export const packetApiKeys = {
  PACKET: 'packet',
};

const postRecent = payloadRecord => {
  return postCallWithRecord(payloadRecord, `${newPacketUrl}/tcpData/recentData`);
};

export const packetApi = {
  [packetApiKeys.PACKET]: {
    call: postRecent,
    REQUEST_RECORD: new Record({
      pastMS: 0,
    }),
  },
};