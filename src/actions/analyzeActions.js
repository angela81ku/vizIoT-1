import { analyzeApi, analyzeApiKeys } from '../data/api/analyzeApi';
import { createAction } from 'redux-act';
import DeviceDimension from '../data/dimensions/DeviceDimension';
import { ConnectionMetric } from '../data/metrics/ConnectionMetric';

export const startAnalyze = createAction();
export const successAnalyze = createAction();
export const failureAnalyze = createAction();

export const startAnalyzeLocation = createAction();
export const successAnalyzeLocation = createAction();
export const failureAnalyzeLocation = createAction();

export const startAnalyzeDevice = createAction();
export const successAnalyzeDevice = createAction();
export const failureAnalyzeDevice = createAction();

/**
 * dimensions: ['seconds']
 * metrics: ['connections']
 */
export const analyzeAggregationByTime = (
  networkId,
  selectionMode,
  macAddresses,
  bucketConfig,
  startMS,
  endMS
) => {
  startAnalyze();
  const { call, REQUEST_RECORD } = analyzeApi[analyzeApiKeys.BY_TIME];

  const requestBody = new REQUEST_RECORD({
    selectionMode,
    macAddresses,
    ...bucketConfig,
    startMS,
    endMS,
  });

  return new Promise(resolve => {
    call(requestBody, networkId)
      .then(resolve)
      .catch(error => {
        failureAnalyze();
      });
  }).then(res => {
    successAnalyze({
      payload: res.data,
      requestBody,
      chartConfig: {
        selectionMode,
        macAddresses,
        ...bucketConfig,
        startMS,
        endMS,
      },
    });
  });
};

/**
 * dimensions: ['location']
 * metrics: ['connections']
 */
// x: Location
// y: [props]
export const analyzeAggregationByLocation = (
  networkId,
  selectionMode,
  startMS,
  endMS
) => {
  startAnalyzeLocation();

  const { call, REQUEST_RECORD } = analyzeApi[analyzeApiKeys.BY_LOCATION];

  const requestBody = new REQUEST_RECORD({
    dimensions: [DeviceDimension.DOMAIN],
    metrics: [ConnectionMetric.HITS],
    selectionMode,
    startMS,
    endMS,
  });

  return new Promise(resolve => {
    call(requestBody, networkId)
      .then(resolve)
      .catch(error => {
        failureAnalyzeLocation(error);
      });
  }).then(res => {
    successAnalyzeLocation({
      payload: res.data,
      request: requestBody,
    });
  });
};

/**
 * dimensions: ['device']
 * metrics: ['connections']
 */
export const analyzeAggregationByDevice = (
  networkId,
  selectionMode,
  startMS,
  endMS
) => {
  startAnalyzeDevice();

  const { call, REQUEST_RECORD } = analyzeApi[analyzeApiKeys.BY_DEVICE];

  const requestBody = new REQUEST_RECORD({
    dimensions: [DeviceDimension.MAC],
    metrics: [ConnectionMetric.HITS],
    selectionMode,
    startMS,
    endMS,
  });

  return new Promise(resolve => {
    call(requestBody, networkId)
      .then(resolve)
      .catch(error => {
        failureAnalyzeDevice(error);
      });
  }).then(res => {
    successAnalyzeDevice({
      payload: res.data,
      request: requestBody,
    });
  });
};
