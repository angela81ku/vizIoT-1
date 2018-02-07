import { URL } from 'url';
import keyMirror from 'keyMirror';
import { Record }from 'immutable';
import {DeviceGroupConstants} from "../utility/RequestUtility"

const HOSTS = {
  DEV: 'http://54.193.126.147:3000',
  PROD: 'http://54.193.126.147:3000',
  MOCK: 'https://7f1bae45-6a9e-45db-a423-d83426b2d13f.mock.pstmn.io'
}

const IP = HOSTS.MOCK;
const defaultNetwork = 42;

export const API = {
  fetchDevices: (networkId=defaultNetwork) => (`${IP}/api/network/${networkId}/devices`),
  aggregateDataByTime: (networkId=defaultNetwork) => (
    `${IP}/api/network/${networkId}/analyze/aggregateDataByTime`
  ),
  aggregateSimple: (macAddress, networkId=defaultNetwork) => (
    `${IP}/api/network/${networkId}/devices/${macAddress}/aggregateSimple`
  ),
}

export const API_KEYS = keyMirror(API);

export const API_REQ_RECORDS = {
  [API_KEYS.aggregateDataByTime]: new Record({
    forNetwork: null,
    forDevice: DeviceGroupConstants.ALL_COMBINED,
    bucketSize: 0,
    bucketProps: [],
    startMS: 0,
    endMS: 0,
  })
}
