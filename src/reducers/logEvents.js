import NetworkState from '../constants/NetworkState'
import moment from 'moment'
import myData4 from './testLog4.json'
import myData5 from './testLog5.json'
import myData6 from './testLog6.json'

const testLog4 = myData4
const testLog5 = myData5
const testLog6 = myData6

const defaultMappedLogs = {
  '192.168.10.115:39490': testLog5,
  '192.168.11.102:46611': testLog6,
}

const defaultState = {
  mappedLogs: defaultMappedLogs,
  timerange: {
    '192.168.10.115:39490': {
      start: moment.unix(defaultMappedLogs['192.168.10.115:39490'][0].time_stamp),
      end: moment.unix(defaultMappedLogs['192.168.10.115:39490'][defaultMappedLogs['192.168.10.115:39490'].length - 1].time_stamp),
    },
    '192.168.11.102:46611': {
      start: moment.unix(defaultMappedLogs['192.168.11.102:46611'][0].time_stamp),
      end: moment.unix(defaultMappedLogs['192.168.11.102:46611'][defaultMappedLogs['192.168.11.102:46611'].length - 1].time_stamp),
    }
  },
  networkState: NetworkState.READY,
}

export default (state = defaultState, action) => {
  switch (action) {
    default:
      return state
  }
}