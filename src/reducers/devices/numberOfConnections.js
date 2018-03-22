import NetworkState from '../../constants/NetworkState';
import { createReducer } from 'redux-act';
import MomentUnit from '../../constants/MomentUnit';
import {
  failureMacToHits,
  startMacToHits,
  successMacToHits,
} from '../../actions/analyzeActions';
import { verifyRow } from '../../utility/AnalyticsValidation';

const defaultState = {
  value: {},
  refreshRate: {
    unit: MomentUnit.SECONDS,
    value: 5,
  },
  networkState: NetworkState.READY,
};

// const fakeResponse = {
//   report: {
//     columns: {
//       dimensions: ['macAddress'],
//       metrics: ['hits'],
//     },
//     data: {
//       rows: [
//         {
//           dimensions: ['0:17:88:68:5f:61'],
//           metrics: ['20'],
//         },
//         {
//           dimensions: ['fc:65:de:5f:15:a'],
//           metrics: ['50'],
//         },
//         {
//           dimensions: ['18:74:2e:41:4d:35'],
//           metrics: ['34'],
//         },
//       ],
//     },
//   },
// };

const convertData = (requestBody, payload) => {
  // TODO remove fake data
  const rows = payload.report.data.rows;
  return rows.reduce((acc, row) => {
    const { dimensions, metrics } = row;
    if (verifyRow(row, 1, 1)) {
      return {
        ...acc,
        [dimensions[0]]: metrics[0],
      };
    }
    return acc;
  }, {});
};

export default createReducer(
  {
    [startMacToHits]: state => ({
      ...state,
      networkState: NetworkState.LOADING,
    }),
    [successMacToHits]: (state, { requestBody, payload }) => {
      return {
        ...state,
        networkState: NetworkState.READY,
        value: convertData(requestBody, payload),
      };
    },
    [failureMacToHits]: (state, { requestBody, payload }) => {
      return {
        ...state,
        networkState: NetworkState.READY,
        // TODO removed fake data
        value: convertData(requestBody, payload),
      };
    },
  },
  defaultState
);
