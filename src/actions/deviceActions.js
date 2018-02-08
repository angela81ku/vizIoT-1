import { createAction } from 'redux-act'
import * as deviceApi from '../data/api/devicesApi'

export const startFetchDevices = createAction()
export const successFetchDevices = createAction()
export const failureFetchDevices = createAction()

export const fetchDevices = (networkId) => {
  startFetchDevices()
  return new Promise(resolve => {
      deviceApi.fetchDevices(networkId)
      .then(resolve)
      .catch((error) => {
        console.log(`failed to fetchDevices from network ${networkId}: ${error}`)
        failureFetchDevices()
      })
  }).then(res => {
      successFetchDevices({payload: res.data})
      return res;
    }
  )
}