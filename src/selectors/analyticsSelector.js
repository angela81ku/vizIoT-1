'use es6';

import _ from 'lodash';
import GeoDimension from '../data/dimensions/GeoDimension';
import { ConnectionMetric } from '../data/metrics/ConnectionMetric';
import TimeDimension from '../data/dimensions/TimeDimension';
import DataReducerTypes from '../constants/DataReducerTypes';
import { convertDateTypeToString } from '../utility/TimeUtility';
import { DateConstants } from '../constants/DateConstants';
import AnalyticsRequest from '../data/records/AnalyticsRequest';
import { getIn, List } from 'immutable';
import TimeMetric from '../data/metrics/TimeMetric';
import { selectDeviceIdList, selectDeviceList } from 'VizIoT/selectors/deviceSelectors';
import * as deviceData from 'VizIoT/data/device/DeviceDataLenses';
import * as R from 'ramda';
import { createSelector } from 'reselect';

export const selectDataWithHash = ({ analytics }, hash) => {
  return analytics.values[hash];
};

export const selectDataWithRequest = (state, request) => {
  return selectDataWithHash(state, request.hashCode());
};

export const selectMostContactedHostLastPeriod = (state, startTime) => {
  const request = new AnalyticsRequest({
    dimensions: [GeoDimension.DOMAIN],
    metrics: [ConnectionMetric.HITS],
    reducer: DataReducerTypes.INDIVIDUAL,
    startTime: startTime,
    endTime: convertDateTypeToString[DateConstants.NOW](),
  });

  const data = selectDataWithRequest(state, request);
  const rows = getIn(data, ['data', 'report', 'data', 'rows']) || [];
  const { dimensions, metrics } = _.maxBy(
    rows,
    ({ metrics }) => metrics[0]
  ) || { dimensions: ['~'], metrics: ['0'] };

  return { domainName: dimensions[0], hits: metrics[0] };
};

export const selectMacAddressToAlias = state => {
  const deviceList = selectDeviceList(state) || List();
  return deviceList.reduce((acc, { macAddress, alias }) => {
    return {
      ...acc,
      [macAddress]: alias,
    };
  }, {});
};

export const selectDomainsToday = (state, numberOf) => {
  const requestKey = new AnalyticsRequest({
    dimensions: [GeoDimension.DOMAIN],
    metrics: [ConnectionMetric.HITS],
    reducer: DataReducerTypes.INDIVIDUAL,
    startTime: convertDateTypeToString[DateConstants.TODAY](),
    endTime: convertDateTypeToString[DateConstants.NOW](),
  });

  const data = selectDataWithRequest(state, requestKey);
  const rows = getIn(data, ['data', 'report', 'data', 'rows'], []);

  return rows.map(({ dimensions, metrics }) => ({
    id: `device ${dimensions[0]}`,
    value: Number(metrics[0]),
  }));
};

export const selectMostRecentDomains = (state, numberOf) => {
  const requestKey = new AnalyticsRequest({
    dimensions: [TimeDimension.TIMESTAMP],
    metrics: [GeoDimension.DESTINATION, GeoDimension.ORIGIN],
    reducer: DataReducerTypes.INDIVIDUAL,
    startTime: convertDateTypeToString[DateConstants.N_SECONDS_AGO](360),
    endTime: convertDateTypeToString[DateConstants.NOW](),
  });
  const data = selectDataWithRequest(state, requestKey);
  const rows = getIn(data, ['data', 'report', 'data', 'rows']) || [];
  return (
    rows
      .sort((a, b) => {
        return Number(b.dimensions[0]) - Number(a.dimensions[0]);
      })
      .slice(0, numberOf)
      // TODO tell backend to fix this flipped bug
      .map(({ dimensions, metrics }) => ({
        name: metrics[1],
        origin: metrics[0],
        timestamp: dimensions[0],
      }))
  );
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

export const selectDataForAllDevices = createSelector(state => {
  // TODO remove mock
  // return R.view(deviceData.allData)(state);
  return 1;
}, data => {return {
  0: {
    total: 530,
    dataIn: 230,
    dataOut: 300,
    velocity: 30,
    velocityByTime: [1, 2, 3, 4, 5, 6, 7, 5, 2, 1, 3, 4, 2, 3, 5, 3, 2],
  },
  1: {
    total: 530,
    dataIn: 230,
    dataOut: 300,
    velocity: 30,
    velocityByTime: [1, 2, 3, 4, 5, 6, 7, 5, 2, 1, 3, 4, 2, 3, 5, 3, 2],
  },
  2: {
    total: 530,
    dataIn: 230,
    dataOut: 300,
    velocity: 30,
    velocityByTime: [1, 2, 3, 4, 5, 6, 7, 5, 2, 1, 3, 4, 2, 3, 5, 3, 2],
  },
}});
