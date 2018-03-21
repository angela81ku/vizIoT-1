import { analyzeApi, analyzeApiKeys } from '../data/api/analyzeApi';
import { createAction } from 'redux-act';
import DeviceDimension from '../data/dimensions/DeviceDimension';
import { ConnectionMetric } from '../data/metrics/ConnectionMetric';

export const startAnalyze = createAction();
export const successAnalyze = createAction();
export const failureAnalyze = createAction();

export const startCoreAnalyze = createAction();
export const successCoreAnalyze = createAction();
export const failureCoreAnalyze = createAction();

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

  let bucketConfigJS = bucketConfig.toJS();

  const requestBody = new REQUEST_RECORD({
    selectionMode,
    macAddresses,
    ...bucketConfigJS,
    startMS,
    endMS,
  });

  // debugger
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
        ...bucketConfigJS,
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
export const analyzeAggregationByLocation = (reducer, startTime, endTime) => {
  startCoreAnalyze();

  const { call, REQUEST_RECORD } = analyzeApi[analyzeApiKeys.BY_LOCATION];

  const requestBody = new REQUEST_RECORD({
    dimensions: [DeviceDimension.DOMAIN],
    metrics: [ConnectionMetric.HITS],
    reducer,
    startTime,
    endTime,
  });

  return new Promise(resolve => {
    call(requestBody)
      .then(resolve)
      .catch(error => {
        failureCoreAnalyze(error);
      });
  }).then(res => {
    successCoreAnalyze({
      payload: res.data,
      requestBody,
    });
  });
};

/**
 * dimensions: ['device']
 * metrics: ['connections']
 */
export const analyzeAggregationByDevice = (
  networkId,
  reducer,
  startTime,
  endTime
) => {
  startAnalyzeDevice();

  const { call, REQUEST_RECORD } = analyzeApi[analyzeApiKeys.BY_DEVICE];

  return new Promise(resolve => {
    call(REQUEST_RECORD, networkId)
      .then(resolve)
      .catch(error => {
        failureAnalyzeDevice({ error, requestBody: REQUEST_RECORD, payload: {} });
      });
  }).then(res => {
    successAnalyzeDevice({
      payload: res.data,
      requestBody: REQUEST_RECORD,
    });
  });
};
