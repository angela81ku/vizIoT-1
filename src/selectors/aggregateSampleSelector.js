import { getIn } from 'immutable';
import { selectAllDevices } from './deviceSelectors';

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

export const mapDeviceToHasData = (state, dataKey) => {
  const devices = selectAllDevices(state);
  return devices.reduce((acc, d) => {
    return {
      ...acc,
      [d.macAddr]: hasAggregationData(state, d.macAddr, dataKey),
    };
  }, {});
};
