'use es6';

import { baseUrlApi, newPacketUrl } from '../../constants/RequestConstants';
import { Record } from 'immutable';
import { postCallWithRecord } from './apiUtils';
import {addTopThreeIOData} from '../aggregators/TopThreeIOAggregator';
import {addTopThreeProtocolData} from "../aggregators/TopThreeProtocolAggregator";

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

export const parseTop3IO = res => {
  if (res.hasOwnProperty('deviceData')) {
    const deviceObject = res.deviceData;
    addTopThreeIOData(deviceObject);
  } else {
    console.log('No deviceData in message from server')
  }
}

export const parseTop3Protocol = res => {
  if (res.hasOwnProperty('deviceData')) {
    const deviceObject = res.deviceData;
    addTopThreeProtocolData(deviceObject);
  } else {
    console.log('No deviceData in message from server');
  }
}

