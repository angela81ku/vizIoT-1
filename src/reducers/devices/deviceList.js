import NetworkState from '../../constants/NetworkState';
import { createReducer } from 'redux-act';
import {
  startFetchDevices,
  successFetchDevices,
  failureFetchDevices,
} from '../../actions/deviceActions';

const defaultState = {
  value: [],
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
        value: result.payload.devices.map(d => {
          return {
            ...d,
            macAddr: d.macAddress,
          };
        }),
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
