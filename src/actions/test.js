import axios from 'axios'
import { createAction } from 'redux-act'
import { API } from '../constants/RequestConstants'

export const fetchAggregationForDevice = (macAddress, payload, bucketConfig) => {
  start()
  return new Promise(resolve => {
    axios({
      method: 'post',
      url: API.aggregateDataByTime(),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      data: payload.toJS()
    }).then(resolve)
      .catch((error) => {
        console.log(`failed to aggregateDataByTime for ${macAddress}: ${error}`)
        failure()
      })
  }).then(res => {
    success({payload: res.data, macAddress, bucketConfig})
    }
  )
}

export const start = createAction()
export const success = createAction()
export const failure = createAction()
export const fetchActionGetTestLogEvents = (macAddress) => {
  start()
  return new Promise(resolve => {
    axios
      .get(API.aggregateSimple(macAddress), {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then(resolve)
      .catch((error) => {
        console.log(`failed to fetchActionGetTestLogEvents for ${macAddress}: ${error}`)
        failure()
      })
  }).then(res => {
      success({payload: res.data, macAddress})
    }
  )
}
