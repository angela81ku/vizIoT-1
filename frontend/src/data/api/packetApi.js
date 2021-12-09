'use es6';

import {baseUrlApi, newPacketUrl} from '../../constants/RequestConstants';
import {Record} from 'immutable';
import {postCallWithRecord} from './apiUtils';
import {addDeviceIOData} from '../aggregators/DeviceDataIOAggregator';
import {addDeviceProtocolData} from '../aggregators/DeviceDataProtocolAggregator';
import {addDeviceDestinationData} from '../aggregators/DeviceDataDestinationAggregator';

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

export const parseDeviceIO = res => {
  if (res.hasOwnProperty('deviceData')) {
    const deviceObject = res.deviceData;
    addDeviceIOData(deviceObject);
  } else {
    console.log('No deviceData in message from server')
  }
}

export const parseDeviceProtocol = res => {
  if (res.hasOwnProperty('deviceData')) {
    const deviceObject = res.deviceData;
    addDeviceProtocolData(deviceObject);
  } else {
    console.log('No deviceData in message from server');
  }
}

export const parseDeviceDestination = res => {
  if (res.hasOwnProperty('deviceData')) {
    const deviceObject = res.deviceData;
    addDeviceDestinationData(deviceObject);
  } else {
    console.log('No deviceData in message from server');
  }
}

