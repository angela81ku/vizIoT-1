// Returns a list of device objects
import AnalyticsRequest from '../data/records/AnalyticsRequest';
import { ConnectionMetric } from '../data/metrics/ConnectionMetric';
import DataReducerTypes from '../constants/DataReducerTypes';
import { convertDateTypeToString } from '../utility/TimeUtility';
import { DateConstants } from '../constants/DateConstants';
import GeoDimension from '../data/dimensions/GeoDimension';

export const selectDeviceList = ({
  devices: {
    deviceList: { value },
  },
}) => {
  return value;
};

export const selectNumberOfDevices = state => {
  let deviceList = selectDeviceList(state);
  return deviceList ? deviceList.length : 0;
};

export const selectEntireNetwork = ({ devices: { entireNetwork } }) => {
  return entireNetwork;
};

/**
 * Returns a map of device.macAddr -> last seen
 */
export const selectLastSeen = ({
  devices: {
    lastSeen: { value },
  },
}) => {
  return value;
};

export const selectNumberOfConnections = ({
  devices: {
    numberOfConnections: { value },
  },
}) => {
  return value;
};

export const selectPercentUnsecuredToday = state => {
  // const { analytics } = state;
  // const key = new AnalyticsRequest({
  //   dimensions: [],
  //   metrics: [ConnectionMetric.PERCENT_SECURED],
  //   reducer: DataReducerTypes.INDIVIDUAL,
  //   startTime: convertDateTypeToString[DateConstants.TODAY](),
  //   endTime: convertDateTypeToString[DateConstants.NOW](),
  // }).hashCode();

  // const percentSecured = analytics.values[key].report.data.rows.metrics[0];
  return '~';
};

export const selectMacAddressToAlias = state => {
  const deviceList = selectDeviceList(state);
  return deviceList.reduce((acc, { macAddress, alias }) => {
    return {
      ...acc,
      [macAddress]: alias,
    };
  }, {});
};

export const selectConnectionsToday = state => {
  const deviceToHitCount = selectNumberOfConnections(state);
  const sum = Object.values(deviceToHitCount).reduce(
    (acc, k) => acc + deviceToHitCount[k],
    0
  );
  return sum;
};

export const selectBusiestDevice = state => {
  const macToAlias = selectMacAddressToAlias(state);

  const deviceToHitCount = selectNumberOfConnections(state);
  const mostPopularEntry = Object.keys(deviceToHitCount).reduce(
    (acc, k) => {
      let value = deviceToHitCount[k];
      if (value > acc.value) {
        let alias = macToAlias[k];
        return {
          name: alias || k,
          value,
        };
      }
      return acc;
    },
    { name: '~', value: 0 }
  );
  return mostPopularEntry;
};
