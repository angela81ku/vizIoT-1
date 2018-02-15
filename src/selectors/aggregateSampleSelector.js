import { getIn } from 'immutable';

export const selectSingleAggregation = (
  { aggregateSample },
  deviceId,
  bucketKey
) => {
  return getIn(aggregateSample.mapDeviceToData, [deviceId, bucketKey], []);
};
