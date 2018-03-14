import { createReducer } from 'redux-act';
import BucketUnit from '../constants/BucketUnit';
import SelectionMode from '../constants/SelectionMode';
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
    dataWindowSize: 4 * 60,
  },

  // analyzeAggregationByDevice

  singleDeviceChartConfig: {
    bucketConfig: new BucketRecord({
      bucketSize: 1,
      bucketProps: [BucketProperty.ACTIVITY_COUNT],
      bucketUnit: BucketUnit.SECOND,
    }),
    selectionMode: SelectionMode.INDIVIDUAL,
    dataWindowSize: 60,
  },

  entireNetwork: {
    id: 123,
    alias: 'Entire Network',
    lastSeen: '1517177323000',
  },
};

export default createReducer({}, defaultState);
