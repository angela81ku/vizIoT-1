'use es6';

import { createAction } from 'redux-act';
import NetworkState from 'VizIoT/constants/NetworkState';

export const createRequestActions = (tag = '"unnamed"') => {
  return {
    [NetworkState.READY]: createAction(`${tag} ready`),
    [NetworkState.LOADING]: createAction(`${tag} loading`),
    [NetworkState.FAILED]: createAction(`${tag} failed`),
  };
};

/**
 * Creates a generic request that uses given redux actions to dispatch state.
 * @param callbacks  -- set of request actions TODO define it
 * @param api        -- API Record TODO define it
 * @returns {function(*=): Promise<any | never>}
 */
export const createGenericRequester = (callbacks, api) => {
  return params => {
    callbacks[NetworkState.LOADING]();

    const { call, ParamRecord } = api;
    const validatedParams = new ParamRecord(params);

    return new Promise(resolve => {
      call(validatedParams)
        .then(resolve)
        .catch(error => {
          callbacks[NetworkState.FAILED](error);
        });
    }).then(res => {
      callbacks[NetworkState.READY]({
        payload: res.data,
        requestBody: validatedParams,
      });
    });
  };
};
