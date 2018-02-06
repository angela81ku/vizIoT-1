import NetworkState from "../constants/NetworkState";
import { createReducer } from 'redux-act'
import { startFetchDevices, successFetchDevices, failureFetchDevices } from '../actions/deviceActions'

const defaultState = {
  devices: [],
  networkState: NetworkState.READY,
}

export default createReducer({
  [startFetchDevices]: (state) => ({...state, networkState: NetworkState.LOADING}),
  [successFetchDevices]: (state, result) => {
    return {
      networkState: NetworkState.READY,
      devices: result.payload.devices,
    }
  },
  [failureFetchDevices]: (state) => {
    return {
      ...state,
      networkState: NetworkState.READY,
    }
  }
}, defaultState)