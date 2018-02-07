import { getIn } from 'immutable'

export const selectAllAggregations = ({aggregateSample}) => {
  return aggregateSample.mapDeviceToData
}

export const selectSingleAggregation = ({aggregateSample}, deviceId, bucketKey) => {
  debugger
  return getIn(aggregateSample.mapDeviceToData, [deviceId, bucketKey], [])
}