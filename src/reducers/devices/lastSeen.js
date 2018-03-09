import NetworkState from '../../constants/NetworkState';
import { createReducer } from 'redux-act';
import {
  startFetchDevices,
  successFetchDevices,
  failureFetchDevices,
} from '../../actions/deviceActions';
import MomentUnit from '../../constants/MomentUnit';

const defaultState = {
  value: {},
  refreshRate: {
    unit: MomentUnit.SECONDS,
    value: 1,
  },
  networkState: NetworkState.READY,
};

export default createReducer(
  {
    [startFetchDevices]: state => ({
      ...state,
      networkState: NetworkState.LOADING,
    }),
    [successFetchDevices]: (state, result) => {
      return {
        ...state,
        networkState: NetworkState.READY,
        value: result.payload.devices,
      };
    },
    [failureFetchDevices]: state => {
      return {
        ...state,
        networkState: NetworkState.READY,
      };
    },
  },
  defaultState
);
