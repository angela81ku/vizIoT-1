import { start, success, failure } from '../actions/test'
import { createReducer } from 'redux-act'
import NetworkState from '../constants/NetworkState'
import { getBucketKey, getBucketKeyWithConfig } from '../utility/BucketUtility'

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
    if (k === 'timestampMS') {
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

const aggregateSample = createReducer({
  [start]: (state) => ({...state, networkState: NetworkState.LOADING}),
  [success]: (state, result) => {
    debugger
    return {
      ...state,
      networkState: NetworkState.READY,
      mapDeviceToData: {
        ...state.mapDeviceToData,
        [result.macAddress]: {
          [getBucketKeyWithConfig({...result.bucketConfig, bucketUnit: 'SECOND'})]: padWithZeros(result.payload.data, 'SECOND'),
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
