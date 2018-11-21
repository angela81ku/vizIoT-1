'use es6';

import { createReducer } from 'redux-act';
import { recentsActionBundle } from 'VizIoT/actions/packetActions';
import NetworkState from 'VizIoT/constants/NetworkState';

const defaultMiddleware = (state, rawRequestData) => {
  return {
    resource: rawRequestData.payload
  };
};

/**
 * Shared reducer factory for building simple reducers for requested resources.
 * This uses redux-act action mappings in order to simply actions.
 * @param name - root name of the reducer
 * @param requestActionBundle - an object of redux-act request actions
 * @param middleware - a function applied on success, with state and payload.
 *                     The return value is spread onto the reducer
 * @returns {Reducer<{}>}
 */
export const createRequestReducer = (name, requestActionBundle, middleware = defaultMiddleware) => {

  const defaultState = {
    [name]: {
      networkState: NetworkState.READY,
    }
  };

  return createReducer({
    [requestActionBundle[NetworkState.LOADING]]: state => {
      return {
        ...state,
        networkState: NetworkState.LOADING,
      };
    },
    [recentsActionBundle[NetworkState.READY]]: (state, rawRequestData) => {
      const formattedResource = middleware(state, rawRequestData);
      return {
        ...state,
        networkState: NetworkState.READY,
        ...formattedResource,
      };
    },
    [recentsActionBundle[NetworkState.FAILED]]: state => {
      return {
        ...state,
        networkState: NetworkState.READY,
      };
    },
  }, defaultState);
};
