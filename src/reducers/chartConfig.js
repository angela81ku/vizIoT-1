import { createReducer } from 'redux-act';
import BucketUnit from '../constants/BucketUnit';
import SelectionMode from '../constants/DataReducerTypes';
import BucketProperty from '../constants/BucketProperty';
import { BucketRecord } from '../data/records/BucketConfig';

const defaultState = {
  mainChartConfig: {
    bucketConfig: new BucketRecord({
      bucketSize: 1,
      bucketProps: [BucketProperty.ACTIVITY_COUNT],
      bucketUnit: BucketUnit.SECOND,
    }),
    selectionMode: SelectionMode.COMBINED,
    dataWindowSize: 60,
  },

  // analyzeAggregationByDevice

  // will be two-device chart configuration
  inoutChartConfig: {
    bucketConfig: new BucketRecord({
      bucketSize: 1,
      bucketProps: [BucketProperty.ACTIVITY_COUNT],
      bucketUnit: BucketUnit.SECOND,
    }),
    selectionMode: SelectionMode.COMBINED,
    dataWindowSize: 60,
  },

  singleDeviceChartConfig: {
    bucketConfig: new BucketRecord({
      bucketSize: 1,
      bucketProps: [BucketProperty.ACTIVITY_COUNT],
      bucketUnit: BucketUnit.SECOND,
    }),
    selectionMode: SelectionMode.INDIVIDUAL,
    dataWindowSize: 30,
  },

  entireNetwork: {
    id: 123,
    alias: 'Network',
    lastSeen: '1517177323000',
  },
};

export default createReducer({}, defaultState);
