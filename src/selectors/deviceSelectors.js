'use es6';

import AnalyticsRequest from '../data/records/AnalyticsRequest';
import { ConnectionMetric } from '../data/metrics/ConnectionMetric';
import DataReducerTypes from '../constants/DataReducerTypes';
import { convertDateTypeToString } from '../utility/TimeUtility';
import { DateConstants } from '../constants/DateConstants';
import GeoDimension from '../data/dimensions/GeoDimension';
import { getIn } from 'immutable';
import * as R from 'ramda';
import * as device from 'VizIoT/data/device/DeviceLenses';
import { createSelector } from 'reselect';
import { deviceToLiveSamples } from 'VizIoT/selectors/packetSelector';
import { takeTop3Size, macAddress } from 'VizIoT/data/device/DeviceDataLenses';
import { findMultiDeviceByMac } from 'VizIoT/data/device/DeviceLenses';

export const selectDeviceList = createSelector(state => {
  const data = R.view(device.deviceListValue, state);
  return data;
}, (deviceList) => {
  return deviceList && deviceList.toJS(); // todo remove toJS and use immutable throughout app
});

export const filterDeviceList = searchValue => createSelector(
  [selectDeviceList, state => state],
  (deviceList, state)  => findMultiDeviceByMac(searchValue)(state),
);

// export const selectDevice = createSelector(selectDeviceList, deviceList => deviceList)

export const selectNumberOfDevices = state => {
  return R.view(device.count)(state);
};

export const selectDeviceIdList = state => {
  const data = R.view(device.idList, state);
  return data && data.toJS();
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

// export const selectPercentUnsecuredToday = state => {
  // const { analytics } = state;
  // const key = new AnalyticsRequest({
  //   dimensions: [],
  //   metrics: [ConnectionMetric.PERCENT_SECURED],
  //   reducer: DataReducerTypes.INDIVIDUAL,
  //   startTime: convertDateTypeToString[DateConstants.TODAY](),
  //   endTime: convertDateTypeToString[DateConstants.NOW](),
  // }).hashCode();

  // const percentSecured = analytics.values[key].report.data.rows.metrics[0];
// };

export const selectMacAddressToAlias = state => {
  const deviceList = selectDeviceList(state) || [];
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

// top 3 devices with most connections in the last 30 seconds
// visualize using a bar chart, which is better for
export const selectThreeDevices = createSelector(
  [selectDeviceList, deviceToLiveSamples, state => state],
  (devices, deviceToLiveSamples, state) => {
    const top3 = takeTop3Size(deviceToLiveSamples);
    const macAddresses = R.map((a) => R.view(macAddress, a), top3);
    const threeDevices = R.compose(
      R.map(macAddress => device.findDeviceByMac(macAddress)(state) || ({ macAddress })),
      R.defaultTo([])
    )(macAddresses);
    return threeDevices;
  }
);