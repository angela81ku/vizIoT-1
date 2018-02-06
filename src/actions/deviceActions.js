import axios from 'axios'
import { createAction } from 'redux-act'
import { API } from '../constants/RequestConstants'

export const startFetchDevices = createAction()
export const successFetchDevices = createAction()
export const failureFetchDevices = createAction()

export const fetchDevices = () => {
  startFetchDevices()
  return new Promise(resolve => {
    axios
      .get(API.fetchDevices(), {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then(resolve)
      .catch((error) => {
        console.log(`failed to fetchDevices: ${error}`)
        failureFetchDevices()
      })
  }).then(res => {
      successFetchDevices({payload: res.data})
      return res;
    }
  )
}