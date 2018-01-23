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
      const thisMoment = moment.unix(parseFloat(time_stamp))
      console.log(parseFloat(time_stamp))

      if (histogramResult.length > 0) {
        // Get last histogram time:
        const lastBucket = histogramResult[histogramResult.length - 1]
        const tally = lastBucket.tally;
        const lastMoment = lastBucket.time_stamp;

        const duration = moment.duration(thisMoment.diff(lastMoment))
        const diffSec = duration.asSeconds()
        console.log(diffSec);

        const bucketSize = 32;

        const thisBucketMoment = moment(thisMoment).startOf('second')
        const lastBucketMoment = moment(lastMoment).startOf('second')

        if (diffSec <= bucketSize) {
          // If on the same duration, modify previous:
          const newHistogram = {
            'time_stamp': thisBucketMoment,
            'tally': tally + 1}
          return [
            ...histogramResult.slice(0, -1),
            newHistogram,
          ]
        } else {
          // If on the different duration, add in blanks until the current bucket:
          const numEmptyBuckets = Math.floor(duration.asSeconds() / bucketSize) - 1
          console.log("numEmptyBuckets");
          console.log(numEmptyBuckets);
          const emptyBuckets = []
          for (let emptyBucketI = 0; emptyBucketI < numEmptyBuckets; emptyBucketI++) {
            console.log("push empty bucket")
            const emptyBucket = {
              'time_stamp': moment(lastBucketMoment).add(emptyBucketI * bucketSize, 'second'),
              tally: 0 }
            emptyBuckets.push(emptyBucket)
          }
          const newHistogram = {
            'time_stamp': thisBucketMoment,
            tally: 1 }
          return [
            ...histogramResult,
            ...emptyBuckets,
            newHistogram]
        }
      } else {
        const newHistogram = {
          'time_stamp': moment(thisMoment).startOf('second'),
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
  return Object.keys(mappedLogs)
    .reduce((mapResult, deviceKey) => {
      mapResult[deviceKey] = reduceToHistogram(mappedLogs[deviceKey])
      return mapResult
    }, {})
}

// All events mapped as: "deviceIP:deviceHost": [device ordered events]
export const selectAllLogsAsList = ({logEvents}) => {
  return logEvents.logs
}

