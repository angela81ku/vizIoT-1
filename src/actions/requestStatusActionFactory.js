'use es6';

import { createAction } from 'redux-act';
import NetworkState from 'VizIoT/constants/NetworkState';

export const buildRequestActions = () => {
  return {
    [NetworkState.READY]: createAction(),
    [NetworkState.LOADING]: createAction(),
    [NetworkState.FAILED]: createAction(),
  };
};

/**
 * Creates a generic request that uses given redux actions to dispatch state.
 * @param callbacks  -- set of request actions TODO define it
 * @param api        -- API Record TODO define it
 * @returns {function(*=): Promise<any | never>}
 */
export const buildGenericRequester = (callbacks, api) => {
  return options => {
    callbacks[NetworkState.LOADING]();

    const { call, REQUEST_RECORD } = api;
    const requestBody = new REQUEST_RECORD(options);

    return new Promise(resolve => {
      call(requestBody)
        .then(resolve)
        .catch(error => {
          callbacks[NetworkState.FAILED](error);
        });
    }).then(res => {
      callbacks[NetworkState.READY]({
        payload: res.data,
        requestBody,
      });
    });
  };
};
