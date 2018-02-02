import NetworkState from '../constants/NetworkState'
import moment from 'moment'

const defaultMappedLogs = {
  '192.168.10.115:39490': [],
  '192.168.11.102:46611': [],
}

const defaultState = {
  mappedLogs: defaultMappedLogs,
  networkState: NetworkState.READY,
}

export default (state = defaultState, action) => {
  switch (action) {
    default:
      return state
  }
}