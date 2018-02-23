import { getIn } from 'immutable';

export const selectSingleAggregation = (
  { aggregateSample },
  deviceKey,
  dataKey
) => {
  return getIn(aggregateSample.mapDeviceToData, [deviceKey, dataKey], []);
};
