'use es6';

import _ from 'lodash';
import GeoDimension from '../data/dimensions/GeoDimension';
import { ConnectionMetric } from '../data/metrics/ConnectionMetric';
import DataReducerTypes from '../constants/DataReducerTypes';
import { convertDateTypeToString } from '../utility/TimeUtility';
import { DateConstants } from '../constants/DateConstants';
import AnalyticsRequest from '../data/records/AnalyticsRequest';
import { getIn } from 'immutable';

export const selectDataWithHash = ({ analytics }, hash) => {
  return analytics.values[hash];
};

export const selectDataWithRequest = (state, request) => {
  return selectDataWithHash(state, request.hashCode());
};

export const selectMostContactedHostToday = state => {
  const request = new AnalyticsRequest({
    dimensions: [GeoDimension.DOMAIN],
    metrics: [ConnectionMetric.HITS],
    reducer: DataReducerTypes.INDIVIDUAL,
    startTime: convertDateTypeToString[DateConstants.TODAY](),
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
  const deviceList = selectDeviceList(state);
  return deviceList.reduce((acc, { macAddress, alias }) => {
    return {
      ...acc,
      [macAddress]: alias,
    };
  }, {});
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
