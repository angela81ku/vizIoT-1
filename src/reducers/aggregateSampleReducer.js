import { start, success, failure } from '../actions/test'
import { createReducer } from 'redux-act'
import { List, fromJS, hasIn } from 'immutable'

const defaultState = {
  running: false,
  mapDeviceToData: {},
}

const padWithZeros = (data, bucketUnit) => {
  if (!data || data.length <= 1) {
    return data;
  }

  let orderedData = List(data);
  // let orderedData = List(data).sortBy(
  //   (obj) => (obj.time_stamp),
  //   (aTimeStr, bTimeStr) => {
  //     const aTime = parseInt(aTimeStr)
  //     const bTime = parseInt(bTimeStr)
  //     if (aTime < bTime) { return -1; }
  //     if (aTime > bTime) { return 1; }
  //     if (aTime === bTime) { return 0; }
  //   }
  // );

  const startData = orderedData.first();
  const endData = orderedData.last();

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
        const foundIdx = orderedData.findIndex((i) => {
          return i.time_stamp === time_stamp
        })
        if (foundIdx < 0)
        {
          const paddedValue = {
            ...zeroData,
            time_stamp,
          }
          paddedData = paddedData.concat(fromJS(paddedValue))
        } else {
          paddedData = paddedData.concat(fromJS(orderedData.get(foundIdx)))
        }
      }
      break;
  }

  return paddedData;
}

const mockData = {
  'data': [
    {
      time_stamp: '1517009506',
      COUNT: 1,
    },
    {
      time_stamp: '1517011678',
      COUNT: 1000,
    },
  ]
}
const mockDevice = '70:2c:1f:3b:36:54';

const bucketUnit = 'SECOND';
const bucketSize = 1;
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
          // [bucketUnit+bucketSize+bucketObjects.join()]: padWithZeros(result.payload.data, bucketUnit),
          [bucketUnit+bucketSize+bucketObjects.join()]: padWithZeros(mockData.data, bucketUnit),
        },
      },
    }
  },
  [failure]: (state) => {
    // return {
    //   ...state,
    //   running: false,
    // }

    return {
      ...state,
      running: false,
      mapDeviceToData: {
        ...state.mapDeviceToData,
        [mockDevice]: {
          // [bucketUnit+bucketSize+bucketObjects.join()]: padWithZeros(result.payload.data, bucketUnit),
          [bucketUnit+bucketSize+bucketObjects.join()]: padWithZeros(mockData.data, bucketUnit),
        },
      },
    }
  }
}, defaultState)

export default aggregateSample
