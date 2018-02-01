import DeviceActionConstants from './constants/DeviceActionConstant';
import GetAggregationConstant from './constants/GetAggregationConstant';
import axios from 'axios';
import { createAction } from 'redux-act';

const IP = 'http://54.193.126.147:3000';
const testDevice = '70:2c:1f:3b:36:54';

// redux action way:

export const start = createAction();
export const success = createAction();

export const fetchActionGetTestLogEvents = () => {
  start();
  return new Promise(resolve => {
    axios
      .get(`${IP}/api/device/${testDevice}/aggregateSimple`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }})
      .then(resolve);
  }).then(result => {
      success(result.data);
    }
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
