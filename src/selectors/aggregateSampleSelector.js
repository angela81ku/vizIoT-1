import { pathOr } from 'ramda';
import { selectDeviceList } from './deviceSelectors';

export const selectSingleAggregation = (
  { aggregateSample },
  deviceKey,
  dataKey
) => {
  return pathOr([], [deviceKey, dataKey], aggregateSample.mapDeviceToData);
};

export const hasAggregationData = ({ aggregateSample }, deviceKey, dataKey) => {
  const data = pathOr([], [deviceKey, dataKey], aggregateSample.mapDeviceToData);
  return data && data.length;
};

export const hasDataForKey = (state, dataKey) => {
  const devices = selectDeviceList(state) || [];
  return devices.reduce((acc, d) => {
    return {
      ...acc,
      [d.macAddr]: hasAggregationData(state, d.macAddr, dataKey),
    };
  }, {});
};
