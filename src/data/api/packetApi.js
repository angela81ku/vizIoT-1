'use es6';

import { baseUrlApi, newPacketUrl } from '../../constants/RequestConstants';
import { Record } from 'immutable';
import { postCallWithRecord } from './apiUtils';
import {addTopThreeIOData} from '../aggregators/TopThreeIOAggregator';

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
  if (res.hasOwnProperty('deviceData')) {
    const deviceObject = res.deviceData;
    addTopThreeIOData(deviceObject);
  } else {
    console.log('No deviceData in message from server')
  }
}