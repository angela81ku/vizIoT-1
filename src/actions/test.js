import DeviceActionConstants from './constants/DeviceActionConstant'
import GetAggregationConstant from './constants/GetAggregationConstant'
import axios from 'axios'
import {createAction} from 'redux-act';

const IP = '100'
const testDevice = '123'

// redux action way:

export const start = createAction();
export const success = createAction();

export const fetchActionGetTestLogEvents = () => {
  start();
  return new Promise(resolve => {
    axios
      .get(`${IP}/device/${testDevice}/aggregateSample`)
      .then(resolve)
  }).then(result =>
      success(result)
  );
};

// redux original

// export const actionGetTestLogEvents = ({dispatch, param}) => {
//   axios
//     .get(`${IP}/device/${testDevice}/aggregateSimple`)
//     .then(response => {
//       dispatch(
//         {
//           type: GetAggregationConstant.FETCH_AGGREGATION,
//           data: response,
//         }
//       )
//     })
//     .catch(error => {
//       dispatch(
//         {
//           type: GetAggregationConstant.FINISH_FETCH_AGGREGATION,
//           error,
//         }
//       )
//     });
//
//   return {
//     type: GetAggregationConstant.FETCH_AGGREGATION,
//   };
// }