import moment from 'moment'

export const selectAllDevices = ({devices}) => {
  return devices.devices
}

const reduceToHistogram = (logEvents) => {
  console.log("reducing:");
  console.log(logEvents)

  return logEvents
    .reduce((histogramResult, logEvent) => {

      const { time_stamp } = logEvent;
      const thisMoment = moment(time_stamp, 'X')

      if (histogramResult.length > 0) {
        // Get last histogram time:
        const lastHisto = histogramResult[histogramResult.length - 1]
        const tally = lastHisto.tally;
        const lastMoment = lastHisto.time_stamp;

        const duration = moment.duration(thisMoment.diff(lastMoment))

        console.log(thisMoment.unix())
        console.log(lastMoment.unix())
        const diffSec = duration.asSeconds()
        console.log(diffSec);

        const histogramInterval = 32;

        if (diffSec <= histogramInterval) {
          // If on the same duration, modify previous:
          const newHistogram = {
            'time_stamp': thisMoment.startOf('second'),
            'tally': tally + 1}
          return [
            ...histogramResult.slice(0, -1),
            newHistogram,
          ]
        } else {
          // If on the different duration, add in blanks until the current time:
          const newHistogram = {
            'time_stamp': thisMoment.startOf('second'),
            tally: 1 }
          return [...histogramResult, newHistogram]
        }
      } else {
        const newHistogram = {
          'time_stamp': thisMoment.startOf('minute'),
          tally: 1
        }
        return [...histogramResult, newHistogram]
      }
    }, [])
}

// All events in latest to oldest order
export const selectAllLogsAsRequestsPerSecond = ({logEvents}) => {
  const mappedLogs = logEvents.mappedLogs
  console.log(mappedLogs);
  const toReturn = Object.keys(mappedLogs)
    .reduce((mapResult, deviceKey) => {
      mapResult[deviceKey] = reduceToHistogram(mappedLogs[deviceKey])
      return mapResult
    }, {})
  console.log(toReturn)
  return toReturn
}

// All events mapped as: "deviceIP:deviceHost": [device ordered events]
export const selectAllLogsAsList = ({logEvents}) => {
  return logEvents.logs
}

