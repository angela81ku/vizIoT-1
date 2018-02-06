import axios from 'axios'
import { createAction } from 'redux-act'
import { API } from '../constants/RequestConstants'

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
