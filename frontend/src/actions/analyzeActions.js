import {analyzeApi, analyzeApiKeys} from '../data/api/analyzeApi';
import {createAction} from 'redux-act';
import DeviceDimension from 'VizIoT/data/dimensions/DeviceDimension';
import {ConnectionMetric} from 'VizIoT/data/metrics/ConnectionMetric';
import {convertDateTypeToString} from 'VizIoT/utility/TimeUtility';
import {DateConstants} from 'VizIoT/constants/DateConstants';
import {createRequestActions} from 'VizIoT/actions/requestStatusActionFactory';

/**
 * @Deprecated exists only for reference
 */

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
export const requestAggregationByTime = (
  networkId,
  selectionMode,
  macAddresses,
  bucketConfig,
  startMS,
  endMS
) => {
  startAnalyze();
  const {call, paramParser} = analyzeApi[analyzeApiKeys.BY_TIME];

  let bucketConfigJS = bucketConfig.toJS();

  const requestBody = new paramParser({
    selectionMode,
    macAddresses,
    ...bucketConfigJS,
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

  const {call, paramParser} = analyzeApi[analyzeApiKeys.BY_LOCATION];

  const requestBody = new paramParser({
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
export const analyzeAggregationByDomain = (
  startTime = convertDateTypeToString[DateConstants.N_SECONDS_AGO](600),
  endTime = convertDateTypeToString[DateConstants.NOW]()
) => {
  startCoreAnalyze();

  const {call, paramParser} = analyzeApi[analyzeApiKeys.DOMAIN_TO_HITS];
  const customRecord = paramParser.set('startTime', startTime).set(
    'endTime',
    endTime
  );

  return new Promise(resolve => {
    call(customRecord)
      .then(resolve)
      .catch(error => {
        failureCoreAnalyze();
      });
  }).then(res => {
    successCoreAnalyze({
      payload: res.data,
      requestBody: customRecord,
    });
  });
};

export const analyzeAggregationCore = (apiKey, startTime, endTime) => {
  startCoreAnalyze();

  const {call, paramParser} = analyzeApi[apiKey];
  const customRecord = paramParser.set('startTime', startTime).set(
    'endTime',
    endTime
  );

  return new Promise(resolve => {
    call(customRecord)
      .then(resolve)
      .catch(error => {
        failureCoreAnalyze();
      });
  }).then(res => {
    successCoreAnalyze({
      payload: res.data,
      requestBody: customRecord,
    });
  });
};

/**
 * ddimensions: ['device']
 * metrics: ['hits']
 */
export const analyzeAggregationByDevice = (reducer, startTime, endTime) => {
  startMacToHits();

  const {call, paramParser} = analyzeApi[analyzeApiKeys.MAC_TO_HITS];
  return new Promise(resolve => {
    call(paramParser)
      .then(resolve)
      .catch(error => {
        failureMacToHits();
      });
  }).then(res => {
    successMacToHits({
      payload: res.data,
      requestBody: paramParser,
    });
  });
};

export const analyticActionBundle = createRequestActions('analytic');
