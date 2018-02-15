import {
  startAnalyze,
  successAnalyze,
  failureAnalyze,
} from '../actions/analyzeActions';
import { createReducer } from 'redux-act';
import NetworkState from '../constants/NetworkState';
import { getBucketKeyWithConfig } from '../utility/BucketUtility';

const defaultState = {
  networkState: NetworkState.READY,
  mapDeviceToData: {},
};

const padWithZeros = (data, bucketUnit) => {
  if (!data || data.length <= 1) {
    return data;
  }

  const startData = data[0];
  const endData = data[data.length - 1];

  const zeroData = Object.keys(startData).reduce((acc, k) => {
    if (k === 'timestamp') {
      return acc;
    }
    acc[k] = 0;
    return acc;
  }, {});

  let paddedData = [];

  switch (bucketUnit) {
    case 'SECOND':
      const startTime = parseInt(startData.timestamp);
      const endTime = parseInt(endData.timestamp);
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

const onSuccess = (state, result) => {
  return {
    ...state,
    networkState: NetworkState.READY,
    mapDeviceToData: {
      ...state.mapDeviceToData,
      [result.deviceId]: {
        [getBucketKeyWithConfig({
          ...result.bucketConfig,
          bucketUnit: 'SECOND',
        })]: padWithZeros(result.payload.data, 'SECOND'),
        // TODO merge with old data
      },
    },
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
