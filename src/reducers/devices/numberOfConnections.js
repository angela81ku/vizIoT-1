import NetworkState from '../../constants/NetworkState';
import { createReducer } from 'redux-act';
import MomentUnit from '../../constants/MomentUnit';
import {
  failureAnalyzeDevice,
  startAnalyzeDevice,
  successAnalyzeDevice,
} from '../../actions/analyzeActions';

const defaultState = {
  value: {},
  refreshRate: {
    unit: MomentUnit.SECONDS,
    value: 5,
  },
  networkState: NetworkState.READY,
};

const fakeResponse = {
  report: {
    columns: {
      dimensions: ['macAddress'],
      metrics: ['hits'],
    },
    data: {
      rows: [
        {
          dimensions: ['mac1'],
          metrics: ['20'],
        },
        {
          dimensions: ['mac2'],
          metrics: ['50'],
        },
        {
          dimensions: ['mac3'],
          metrics: ['34'],
        },
      ],
    },
  },
};

const convertData = (requestBody, payload) => {
  // TODO remove fake data
  const rows = fakeResponse.report.data.rows;
  return rows.reduce((acc, { dimensions, metrics }) => {
    return {
      ...acc,
      [dimensions[0]]: metrics[0],
    };
  }, {});
};

export default createReducer(
  {
    [startAnalyzeDevice]: state => ({
      ...state,
      networkState: NetworkState.LOADING,
    }),
    [successAnalyzeDevice]: (state, { requestBody, payload }) => {
      return {
        ...state,
        networkState: NetworkState.READY,
        value: convertData(requestBody, payload),
      };
    },
    [failureAnalyzeDevice]: (state, error, { requestBody, payload }) => {
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
