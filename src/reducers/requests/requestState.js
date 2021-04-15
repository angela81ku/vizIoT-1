'use es6';

import {createReducer} from 'redux-act';
import NetworkState from 'VizIoT/constants/NetworkState';

const defaultMiddleware = (state, rawRequestData) => {
  return {
    resource: rawRequestData.payload
  };
};

/**
 * Shared reducer factory for building simple reducers for requested resources.
 * This uses redux-act action mappings in order to simply actions.
 * @param defaultState
 * @param requestActionBundle - an object of redux-act request actions
 * @param middleware - a function applied on success, with state and payload.
 *                     The return value is spread onto the reducer
 * @returns {Reducer<{}>}
 */
export const createRequestReducer = (defaultState, requestActionBundle, middleware = defaultMiddleware) => {

  const defaultStateWithStatus = {
    ...defaultState,
    networkState: NetworkState.READY,
  };

  return createReducer({
    [requestActionBundle[NetworkState.LOADING]]: state => {
      return {
        ...state,
        networkState: NetworkState.LOADING,
      };
    },
    [requestActionBundle[NetworkState.READY]]: (state, rawRequestData) => {
      const formattedResource = middleware(state, rawRequestData);
      return {
        ...state,
        networkState: NetworkState.READY,
        ...formattedResource,
      };
    },
    [requestActionBundle[NetworkState.FAILED]]: state => {
      return {
        ...state,
        networkState: NetworkState.READY,
      };
    },
  }, defaultStateWithStatus);
};
