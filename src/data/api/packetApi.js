'use es6';

import { newPacketUrl } from 'VizIoT/constants/RequestConstants';
import { Record } from 'immutable/dist/immutable';
import { postCallWithRecord } from 'VizIoT/data/api/apiUtils';

export const packetApiKeys = {
  PACKET: 'packet',
};

export const packetApi = {
  [packetApiKeys.PACKET]: {
    call: immParam => {
      return postCallWithRecord(immParam, `${newPacketUrl}/tcpData/recentData`);
    },
    paramParser: new Record({
      pastMS: 0,
    }),
  },
};