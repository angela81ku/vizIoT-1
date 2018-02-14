import NetworkState from "../constants/NetworkState";
import { createReducer } from 'redux-act'
import { startFetchDevices, successFetchDevices, failureFetchDevices } from '../actions/deviceActions'

const defaultState = {
  devices: [{
    "uuid": 123,
    "alias": "Entire Network",
    "socketAddr": "192.168.10.115:39490",
    "ip": "192.168.10.115",
    "port": "39490",
    "macAddr": "ALL_COMBINED",
    "lastSeen": "1517177323000"
  }],
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