import axios from 'axios'
import { createAction } from 'redux-act'

const IP = 'http://54.193.126.147:3000'

// redux action way:

export const start = createAction()
export const success = createAction()
export const failure = createAction()

export const fetchActionGetTestLogEvents = (macAddress) => {
  start()
  return new Promise(resolve => {
    axios
      .get(`${IP}/api/device/${macAddress}/aggregateSimple`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then(resolve)
      .catch((error) => {
        console.log(`failed to fetchActionGetTestLogEvents for ${macAddress}: ${error}`)
        failure()
      })
  }).then(res => {
      success({payload: res.data, macAddress})
    }
  )
}

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
