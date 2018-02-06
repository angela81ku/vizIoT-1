import { start, success, failure } from '../actions/test'
import { createReducer } from 'redux-act'
import NetworkState from '../constants/NetworkState'
import { getBucketKey } from '../utility/BucketUtility'

const defaultState = {
  networkState: NetworkState.READY,
  mapDeviceToData: {},
}

const padWithZeros = (data, bucketUnit) => {
  if (!data || data.length <= 1) {
    return data;
  }

  const startData = data[0];
  const endData = data[data.length - 1];

  const zeroData = Object.keys(startData).reduce((acc, k) => {
    if (k === 'time_stamp') {
      return acc;
    }
    acc[k] = 0;
    return acc;
  }, {})

  let paddedData = []

  switch (bucketUnit) {
    case 'SECOND':
      const startTime = parseInt(startData.time_stamp);
      const endTime = parseInt(endData.time_stamp);
      for (let t = startTime; t <= endTime; t++) {
        const time_stamp = t.toString()
        const foundIdx = data.findIndex((i) => {
          return i.time_stamp === time_stamp
        })
        if (foundIdx < 0) {
          const paddedValue = {
            ...zeroData,
            time_stamp: t,
          }
          paddedData.push(paddedValue)
        } else {
          paddedData.push({
            ...data[foundIdx],
            time_stamp: t,
          })
        }
      }
      break;
  }

  return paddedData;
}

const bucketUnit = 'SECOND';
const bucketSize = 1;
const bucketObjects = ['COUNT'];

const aggregateSample = createReducer({
  [start]: (state) => ({...state, networkState: NetworkState.LOADING}),
  [success]: (state, result) => {
    return {
      ...state,
      networkState: NetworkState.READY,
      mapDeviceToData: {
        ...state.mapDeviceToData,
        [result.macAddress]: {
          [getBucketKey(bucketUnit, bucketSize, bucketObjects)]: padWithZeros(result.payload.data, bucketUnit),
        },
      },
    }
  },
  [failure]: (state) => {
    return {
      ...state,
      networkState: NetworkState.READY,
    }
  }
}, defaultState)

export default aggregateSample
