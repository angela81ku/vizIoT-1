import { getIn } from 'immutable';
import { selectDeviceList } from './deviceSelectors';

export const selectSingleAggregation = (
  { aggregateSample },
  deviceKey,
  dataKey
) => {
  return getIn(aggregateSample.mapDeviceToData, [deviceKey, dataKey], []);
};

export const hasAggregationData = ({ aggregateSample }, deviceKey, dataKey) => {
  const data = getIn(aggregateSample.mapDeviceToData, [deviceKey, dataKey], []);
  return data && data.length;
};

export const hasDataForKey = (state, dataKey) => {
  const devices = selectDeviceList(state);
  return devices.reduce((acc, d) => {
    return {
      ...acc,
      [d.macAddr]: hasAggregationData(state, d.macAddr, dataKey),
    };
  }, {});
};
