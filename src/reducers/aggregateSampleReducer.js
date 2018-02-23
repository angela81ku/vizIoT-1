import {
  startAnalyze,
  successAnalyze,
  failureAnalyze,
} from '../actions/analyzeActions';
import { createReducer } from 'redux-act';
import NetworkState from '../constants/NetworkState';
import BucketUnitConstants from '../constants/BucketUnit';
import { getDataKey } from '../utility/DataKey';

const defaultState = {
  networkState: NetworkState.READY,
  mapDeviceToData: {},
};

const padWithZeros = (data, bucketUnit, startTimestamp, endTimestamp) => {
  if (!data || data.length <= 1) {
    return data;
  }

  const anyData = data[0];
  const zeroData = Object.keys(anyData).reduce((acc, k) => {
    if (k === 'timestamp') {
      return acc;
    }
    acc[k] = 0;
    return acc;
  }, {});

  let paddedData = [];

  switch (bucketUnit) {
    case BucketUnitConstants.SECOND:
      const startTime = Math.floor(startTimestamp);
      const endTime = Math.floor(endTimestamp);
      for (let t = startTime; t <= endTime; t += 1) {
        const foundIdx = data.findIndex(i => {
          return Math.floor(parseFloat(i.timestamp)) === t;
        });
        if (foundIdx < 0) {
          const paddedValue = {
            ...zeroData,
            timestamp: t,
          };
          paddedData.push(paddedValue);
        } else {
          paddedData.push({
            ...data[foundIdx],
            timestamp: t,
          });
        }
      }
      break;
  }

  return paddedData;
};

/*

macAddresses
bucketConfig,
timeRange,

macAddress / combined ... bucketConfig + macAddresses

mapDeviceToData: {
  12:34: { 1,2,3,4 }
  combined: { abc,2,3,4 }

}

 */
const mergeData = (oldMapDeviceToData, chartConfig, payload) => {
  const { macAddresses, startMS, endMS, ...rest } = chartConfig;
  const { bucketUnit } = rest;

  // TODO merge with old data
  return payload.reduce((mapDeviceToData, { key, data }) => {
    let dataKey;
    if (key === 'COMBINED') {
      debugger;
      dataKey = getDataKey({ ...rest, macAddresses });
    } else {
      dataKey = getDataKey(rest);
    }

    mapDeviceToData = {
      ...mapDeviceToData,
      [key]: {
        ...mapDeviceToData[key],
        [dataKey]: padWithZeros(data, bucketUnit, startMS, endMS),
      },
    };

    return mapDeviceToData;
  }, oldMapDeviceToData);
};

const onSuccess = (state, { chartConfig, requestBody, payload }) => {
  return {
    ...state,
    networkState: NetworkState.READY,
    mapDeviceToData: mergeData(state.mapDeviceToData, chartConfig, payload),
  };
};

const aggregateSample = createReducer(
  {
    [startAnalyze]: state => ({ ...state, networkState: NetworkState.LOADING }),
    [successAnalyze]: onSuccess,
    [failureAnalyze]: state => {
      return {
        ...state,
        networkState: NetworkState.READY,
      };
    },
  },
  defaultState
);

export default aggregateSample;
