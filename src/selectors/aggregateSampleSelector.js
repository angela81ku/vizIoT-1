import moment from 'moment'

export const selectAllAggregations = ({aggregateSample}) => {
  // let toReturn = mockData.data
  return aggregateSample.mapDeviceToData;
  let reformattedData =
    Object.keys(toReturn).reduce((arr, time_stamp) => {
      return [
        ...arr,
        {
          time_stamp: moment.unix(parseInt(time_stamp)),
          tally: toReturn[time_stamp]
        }
      ]
    }, [])
  return {
    '192.168.10.115:39490': reformattedData,
    '192.168.11.102:46610': reformattedData,
  }
}
