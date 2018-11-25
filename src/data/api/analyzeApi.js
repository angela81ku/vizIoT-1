import axios from 'axios';
import { headers, baseUrl } from 'VizIoT/constants/RequestConstants';
import { Record } from 'immutable';
import DataReducerTypes from 'VizIoT/constants/DataReducerTypes';
import AnalyticsRequest from 'VizIoT/data/records/AnalyticsRequest';
import GeoDimension from 'VizIoT/data/dimensions/GeoDimension';
import { ConnectionMetric } from 'VizIoT/data/metrics/ConnectionMetric';
import { DateConstants } from 'VizIoT/constants/DateConstants';
import { convertDateTypeToString } from 'VizIoT/utility/TimeUtility';
import DeviceDimension from 'VizIoT/data/dimensions/DeviceDimension';
import TimeDimension from 'VizIoT/data/dimensions/TimeDimension';
import { postCallWithRecord } from 'VizIoT/data/api/apiUtils';

const analyzeAggregationCore = payloadRecord => {
  return postCallWithRecord(payloadRecord, `${baseUrl}/api/analyze/core`);
};

const analyzeAggregationByTime = (payloadRecord, networkId) => {
  return postCallWithRecord(
    payloadRecord,
    `${baseUrl}/api/networks/${networkId}/analyze/aggregateDataByTime`
  );
};

const analyzeAggregationByLocation = payloadRecord => {
  return analyzeAggregationCore(payloadRecord);
};

export const analyzeApiKeys = {
  CORE: 'analyzeAggregationCore',
  BY_TIME: 'requestAggregationByTime',
  BY_LOCATION: 'analyzeAggregationByLocation',
  BY_DEVICE: 'analyzeAggregationByDevice',
  MAC_TO_HITS: 'macToHits',
  DOMAIN_TO_HITS: 'domainToHits',
  TIME_TO_DOMAIN: 'timeToDomain',
  TIME_TO_LOG: 'timeToLog',
};

export const analyzeApi = {
  // Within a time range: for each device, for each time unit, give me a tally for [bucketProps]
  [analyzeApiKeys.BY_TIME]: {
    call: analyzeAggregationByTime,
    paramParser: new Record({
      selectionMode: DataReducerTypes.COMBINED,
      macAddresses: [],
      bucketSize: 1,
      bucketProps: [],
      startMS: 0,
      endMS: 0,
    }),
  },

  // Within a time range: for each device, for each location, give me a tally for [bucketProps]
  [analyzeApiKeys.BY_LOCATION]: {
    call: analyzeAggregationByLocation,
    paramParser: new AnalyticsRequest({
      dimensions: [GeoDimension.DOMAIN],
      metrics: [ConnectionMetric.HITS],
      reducer: DataReducerTypes.INDIVIDUAL,
      startTime: convertDateTypeToString[DateConstants.TODAY](),
      endTime: convertDateTypeToString[DateConstants.NOW](),
    }),
  },

  [analyzeApiKeys.CORE]: {
    call: analyzeAggregationCore,
    paramParser: new AnalyticsRequest({
      dimensions: [],
      metrics: [ConnectionMetric.HITS],
      reducer: DataReducerTypes.INDIVIDUAL,
      startTime: convertDateTypeToString[DateConstants.TODAY](),
      endTime: convertDateTypeToString[DateConstants.NOW](),
    }),
  },

  [analyzeApiKeys.MAC_TO_HITS]: {
    call: analyzeAggregationCore,
    paramParser: new AnalyticsRequest({
      dimensions: [DeviceDimension.MAC],
      metrics: [ConnectionMetric.HITS],
      reducer: DataReducerTypes.INDIVIDUAL,
      startTime: convertDateTypeToString[DateConstants.TODAY](),
      endTime: convertDateTypeToString[DateConstants.NOW](),
    }),
  },

  [analyzeApiKeys.DOMAIN_TO_HITS]: {
    call: analyzeAggregationCore,
    paramParser: new AnalyticsRequest({
      dimensions: [GeoDimension.DOMAIN],
      metrics: [ConnectionMetric.HITS],
      reducer: DataReducerTypes.INDIVIDUAL,
      startTime: convertDateTypeToString[DateConstants.TODAY](),
      endTime: convertDateTypeToString[DateConstants.NOW](),
    }),
  },

  [analyzeApiKeys.TIME_TO_DOMAIN]: {
    call: analyzeAggregationCore,
    paramParser: new AnalyticsRequest({
      dimensions: [TimeDimension.TIMESTAMP],
      metrics: [GeoDimension.DESTINATION],
      reducer: DataReducerTypes.INDIVIDUAL,
      startTime: convertDateTypeToString[DateConstants.TODAY](),
      endTime: convertDateTypeToString[DateConstants.NOW](),
    }),
  },

  [analyzeApiKeys.TIME_TO_LOG]: {
    call: analyzeAggregationCore,
    paramParser: new AnalyticsRequest({
      dimensions: [TimeDimension.TIMESTAMP],
      metrics: [GeoDimension.DESTINATION, GeoDimension.ORIGIN],
      reducer: DataReducerTypes.INDIVIDUAL,
      startTime: convertDateTypeToString[DateConstants.TODAY](),
      endTime: convertDateTypeToString[DateConstants.NOW](),
    }),
  },
};
