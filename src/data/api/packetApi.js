'use es6';

import { baseUrlApi, newPacketUrl } from '../../constants/RequestConstants';
import { Record } from 'immutable';
import { postCallWithRecord } from './apiUtils';
import {addData} from './DataAggregator';

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

export const parseTop3 = res => {
  const deviceObject = res.deviceData;
  addData(deviceObject);
}