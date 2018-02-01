import { start, success } from '../actions/test';
import {createReducer} from 'redux-act';

const aggregateSample = createReducer({
  [start]: (state) => ({ ...state, running: true }),
  [success]: (state, result) => {
    return {
      ...state,
      running: false,
      aggregatedTest: result
    }
  },
}, {
  running: false,
  aggregatedTest: false,
})

export default aggregateSample;
