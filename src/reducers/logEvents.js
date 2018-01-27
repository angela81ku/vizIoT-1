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

const getTimeRange = (key) => {
  const log = defaultMappedLogs[key];
  return {
    start: moment.unix(log[0].time_stamp),
      end: moment.unix(log[log.length - 1].time_stamp),
  };
}

const getTimeRangesFromLogs = () => {
  const result = Object.keys(defaultMappedLogs).reduce((acc, key) => {
    acc[key] = getTimeRange(key)
    return acc;
  }, {})
  console.log(result);
  return result;
}

const defaultState = {
  mappedLogs: defaultMappedLogs,
  timerange: getTimeRangesFromLogs(),
  networkState: NetworkState.READY,
}

export default (state = defaultState, action) => {
  switch (action) {
    default:
      return state
  }
}