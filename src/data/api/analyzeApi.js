import axios from 'axios';
import { headers, baseUrl } from '../../constants/RequestConstants';
import { Record } from 'immutable';
import keyMirror from 'keyMirror';
import SelectionMode from '../../constants/SelectionMode';

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

const analyzeAggregationByDevice = (payloadRecord, networkId) => {
  const url = `${baseUrl}/api/networks/${networkId}/analyze/aggregateDataByDevice`;

  return axios({
    method: 'post',
    url,
    headers,
    data: payloadRecord.toJS(),
  });
};

export const analyzeApiKeys = {
  BY_TIME: 'analyzeAggregationByTime',
  BY_LOCATION: 'analyzeAggregationByLocation',
  BY_DEVICE: 'analyzeAggregationByDevice',
};

export const analyzeApi = {
  // Within a time range: for each device, for each time unit, give me a tally for [bucketProps]
  [analyzeApiKeys.BY_TIME]: {
    call: analyzeAggregationByTime,
    REQUEST_RECORD: new Record({
      selectionMode: SelectionMode.COMBINED,
      macAddresses: [],
      bucketSize: 1,
      bucketProps: [],
      startMS: 0,
      endMS: 0,
    }),
  },

  // Within a time range: for each device, for each location, give me a tally for [bucketProps]
  [analyzeApiKeys.BY_LOCATION]: {
    call: analyzeAggregationByLocation,
    REQUEST_RECORD: new Record({
      dimensions: [],
      metrics: [],
      selectionMode: SelectionMode.COMBINED,
      startMS: 0,
      endMS: 0,
    }),
  },

  // Within a time range: for each device, give me a tally for [bucketProps]
  [analyzeApiKeys.BY_DEVICE]: {
    call: analyzeAggregationByDevice,
    REQUEST_RECORD: new Record({
      dimensions: [],
      metrics: [],
      selectionMode: SelectionMode.COMBINED,
      startMS: 0,
      endMS: 0,
    }),
  },
};
