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

export const startMacToHits = createAction();
export const successMacToHits = createAction();
export const failureMacToHits = createAction();

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
 * dimensions: ['DOMAIN']
 * metrics: ['HITS']
 */
export const analyzeAggregationByDomain = (reducer, startTime, endTime) => {
  startCoreAnalyze();

  const { call, REQUEST_RECORD } = analyzeApi[analyzeApiKeys.DOMAIN_TO_HITS];
  return new Promise(resolve => {
    call(REQUEST_RECORD)
      .then(resolve)
      .catch(error => {
        failureCoreAnalyze();
      });
  }).then(res => {
    successCoreAnalyze({
      payload: res.data,
      requestBody: REQUEST_RECORD,
    });
  });
};

/**
 * dimensions: ['device']
 * metrics: ['hits']
 */
export const analyzeAggregationByDevice = (reducer, startTime, endTime) => {
  startMacToHits();

  const { call, REQUEST_RECORD } = analyzeApi[analyzeApiKeys.MAC_TO_HITS];
  return new Promise(resolve => {
    call(REQUEST_RECORD)
      .then(resolve)
      .catch(error => {
        failureMacToHits();
      });
  }).then(res => {
    successMacToHits({
      payload: res.data,
      requestBody: REQUEST_RECORD,
    });
  });
};
