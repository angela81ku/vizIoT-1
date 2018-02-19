import {
  startAnalyze,
  successAnalyze,
  failureAnalyze,
} from '../actions/analyzeActions';
import { createReducer } from 'redux-act';
import NetworkState from '../constants/NetworkState';
import { getBucketKeyWithConfig } from '../utility/BucketUtility';
import BucketUnitConstants from '../constants/BucketUnitConstants';

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

const onSuccess = (state, result) => {
  return {
    ...state,
    networkState: NetworkState.READY,
    mapDeviceToData: {
      ...state.mapDeviceToData,
      [result.deviceId]: {
        [getBucketKeyWithConfig(result.bucketConfig)]: padWithZeros(
          result.payload.data,
          result.bucketConfig.bucketUnit,
          result.startMS,
          result.endMS
        ),
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
