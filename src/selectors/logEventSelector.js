import moment from 'moment'

export const selectAllDevices = ({devices}) => {
  return devices.devices;
}

// All events in latest to oldest order
export const selectAllLogsAsRequestsPerSecond = ({logEvents}) => {
}

// All events mapped as: "deviceIP:deviceHost": [device ordered events]
export const selectAllLogsAsList = ({logEvents}) => {
}

export const selectAllTimeranges = ({logEvents: {timerange}}) => {
}

