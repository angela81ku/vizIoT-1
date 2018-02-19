import { analyzeApi, analyzeApiKeys } from '../data/api/analyzeApi';
import { createAction } from 'redux-act';
import BucketUnitConstants from '../constants/BucketUnitConstants';

export const startAnalyze = createAction();
export const successAnalyze = createAction();
export const failureAnalyze = createAction();

export const analyzeAggregationByTime = (
  networkId,
  deviceId,
  bucketConfig,
  startMS,
  endMS
) => {
  startAnalyze();
  return new Promise(resolve => {
    const { call, REQUEST_RECORD } = analyzeApi[
      analyzeApiKeys.analyzeAggregationByTime
    ];

    call(
      new REQUEST_RECORD({
        forDevice: deviceId,
        forNetwork: '34',
        ...bucketConfig,
        startMS,
        endMS,
      }),
      networkId
    )
      .then(resolve)
      .catch(error => {
        console.log(`failed to aggregateDataByTime for ${deviceId}: ${error}`);
        failureAnalyze();
      });
  }).then(res => {
    console.log(`successfully aggregateDataByTime for ${deviceId}`);
    successAnalyze({
      payload: res.data,
      deviceId,
      bucketConfig,
      startMS,
      endMS,
    });
  });
};

// x: Location
// y: [props]
export const analyzeAggregationByLocation = (
  networkId,
  deviceId,
  bucketConfig,
  startMS,
  endMS
) => {
  startAnalyze();
  return new Promise(resolve => {
    const { call, REQUEST_RECORD } = analyzeApi[
      analyzeApiKeys.analyzeAggregationByLocation
    ];

    call(
      new REQUEST_RECORD({
        forNetwork: networkId,
        forDevice: deviceId,
        ...bucketConfig,
        startMS,
        endMS,
      }),
      networkId
    )
      .then(resolve)
      .catch(error => {
        console.log(
          `failed to aggregateDataByLocation for ${deviceId}: ${error}`
        );
        failureAnalyze();
      });
  }).then(res => {
    console.log(`successfully aggregateDataByTime for ${deviceId}`);
    successAnalyze({
      payload: res.data,
      deviceId,
      bucketConfig,
    });
  });
};
