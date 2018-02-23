import { createReducer } from 'redux-act';
import BucketUnit from '../constants/BucketUnit';
import SelectionMode from '../constants/SelectionMode';

const defaultState = {
  mainChartConfig: {
    bucketConfig: {
      bucketSize: 1,
      bucketProps: ['ACTIVITY_COUNT'],
      bucketUnit: BucketUnit.SECOND,
    },
    selectionMode: SelectionMode.COMBINED,
    dataWindowSize: 4 * 60,
  },

  singleDeviceChartConfig: {
    bucketConfig: {
      bucketSize: 1,
      bucketProps: ['ACTIVITY_COUNT'],
      bucketUnit: BucketUnit.SECOND,
    },
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
