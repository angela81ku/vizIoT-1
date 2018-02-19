import axios from 'axios';
import { headers, baseUrl } from '../../constants/RequestConstants';
import { Record } from 'immutable';
import { DeviceGroupConstants } from '../../constants/DeviceGroupConstants';
import keyMirror from 'keyMirror';

const analyzeAggregationByTime = (payloadRecord, networkId) => {
  const url = `${baseUrl}/api/networks/${networkId}/analyze/aggregateDataByTime`;

  return axios({
    method: 'post',
    url,
    headers,
    data: payloadRecord.toJS(),
  });
};

const analyzeAggregationByLocation = (payloadRecord, networkId) => {
  const url = `${baseUrl}/api/network/${networkId}/analyze/aggregateDataByLocation`;

  return axios({
    method: 'post',
    url,
    headers,
    data: payloadRecord.toJS(),
  });
};

export const analyzeApi = {
  ['analyzeAggregationByTime']: {
    call: analyzeAggregationByTime,
    REQUEST_RECORD: new Record({
      forNetwork: '',
      forDevice: DeviceGroupConstants.ALL_COMBINED,
      bucketSize: 1,
      bucketProps: [],
      startMS: 0,
      endMS: 0,
    }),
  },
  ['analyzeAggregationByLocation']: {
    call: analyzeAggregationByLocation,
    REQUEST_RECORD: new Record({
      forNetwork: '',
      forDevice: DeviceGroupConstants.ALL_COMBINED,
      bucketProps: [],
      startMS: 0,
      endMS: 0,
    }),
  },
};

export const analyzeApiKeys = keyMirror(analyzeApi);
