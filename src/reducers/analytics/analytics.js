import {
  startCoreAnalyze,
  successCoreAnalyze,
  failureCoreAnalyze,
} from '../../actions/analyzeActions';
import { createReducer } from 'redux-act';
import NetworkState from '../../constants/NetworkState';
import BucketUnitConstants from '../../constants/BucketUnit';

const defaultState = {
  networkState: NetworkState.READY,
  values: {},
};

const padWithZeros = (rawData, requestRecord) => {
  if (!rawData || !rawData.length) {
    return rawData;
  }

  const startTime = requestRecord.getStartTime();
  const endTime = requestRecord.getEndTime();
  const metrics = requestRecord.getMetrics();
  const dimensions = requestRecord.getDimensions();
  const reducer = requestRecord.getReducer();
  const filter = requestRecord.getFilter();

  const anyData = rawData[0];
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
      const startTime = Math.floor(startTime);
      const endTime = Math.floor(endTime);
      for (let t = startTime; t <= endTime; t += 1) {
        const foundIdx = rawData.findIndex(i => {
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
            ...rawData[foundIdx],
            timestamp: t,
          });
        }
      }
      break;
  }

  return paddedData;
};

const mergeData = (oldMapping, requestRecord, payload) => {
  // TODO merge with old data
  return payload.reduce((updatedMapping, { key, data }) => {
    updatedMapping = {
      ...updatedMapping,
      [key]: {
        ...updatedMapping[key],
        [requestRecord.hashCode()]: {
          config: requestRecord,
          data: padWithZeros(data, requestRecord),
        },
      },
    };

    return updatedMapping;
  }, oldMapping);
};

const onSuccess = (state, { requestBody, payload }) => {
  return {
    ...state,
    networkState: NetworkState.READY,
    values: mergeData(state.mapDeviceToData, requestBody, payload),
  };
};

const onFailure = state => {
  return {
    ...state,
    networkState: NetworkState.READY,
  };
};

const onStart = state => {
  return {
    ...state,
    networkState: NetworkState.LOADING,
  };
};

export default createReducer(
  {
    [startCoreAnalyze]: onStart,
    [successCoreAnalyze]: onSuccess,
    [failureCoreAnalyze]: onFailure,
  },
  defaultState
);
