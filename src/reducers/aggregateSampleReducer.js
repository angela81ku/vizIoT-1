import { start, success, failure } from '../actions/test'
import { createReducer } from 'redux-act'

const defaultState = {
  running: false,
  mapDeviceToData: {},
}

const padWithZeros = (data, bucketType) => {
  if (!data || data.length <= 1) {
    return data;
  }

  const startData = data[0];
  const endData = data[data.length - 1];

  const zeroData = Object.keys(data).reduce((acc, k) => {
    if (k === 'time_stamp') {
      return acc;
    }
    acc[k] = 0;
    return acc;
  }, {})

  switch (bucketType) {
    case 'SECOND':

      break;
  }

}

const bucketType = 'SECOND';
const bucketSize = 0;
const bucketObjects = ['COUNT'];

const aggregateSample = createReducer({
  [start]: (state) => ({...state, running: true}),
  [success]: (state, result) => {
    return {
      ...state,
      running: false,
      mapDeviceToData: {
        ...state.mapDeviceToData,
        [result.macAddress]: {
          [bucketType+bucketSize+bucketObjects.join()]: padWithZeros(result.payload.data, bucketType),
        },
      },
    }
  },
  [failure]: (state) => {
    return {
      ...state,
      running: false,
    }
  }
}, defaultState)

export default aggregateSample
