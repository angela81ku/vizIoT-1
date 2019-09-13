'use es6';

import { baseUrlApi, newPacketUrl } from 'VizIoT/constants/RequestConstants';
import { Record } from 'immutable';
import { postCallWithRecord } from 'VizIoT/data/api/apiUtils';

export const packetApiKeys = {
  PACKET: 'packet',
};

export const packetApi = {
  [packetApiKeys.PACKET]: {
    call: immParam => {
      return postCallWithRecord(immParam, `${baseUrlApi}/tcpData/recentData`);
    },
    paramParser: new Record({
      pastMS: 0,
    }),
  },
};