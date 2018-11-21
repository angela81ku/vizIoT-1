'use es6';

import { newPacketUrl } from 'VizIoT/constants/RequestConstants';
import { Record } from 'immutable/dist/immutable';
import { postCallWithRecord } from 'VizIoT/data/api/apiUtils';

export const packetApiKeys = {
  PACKET: 'packet',
};

const postRecent = paramRecord => {
  return postCallWithRecord(paramRecord, `${newPacketUrl}/tcpData/recentData`);
};

export const packetApi = {
  [packetApiKeys.PACKET]: {
    call: postRecent,
    ParamRecord: new Record({
      pastMS: 0,
    }),
  },
};