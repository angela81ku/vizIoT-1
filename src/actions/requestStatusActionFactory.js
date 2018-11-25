'use es6';

import { createAction } from 'redux-act';
import NetworkState from 'VizIoT/constants/NetworkState';
import { callLens, paramParser } from 'VizIoT/data/api/ApiLenses';
import * as R from 'ramda';
import NetworkResponse from 'VizIoT/data/api/NetworkResponse';

/**
 * @param tag -- optional name to describe the actions
 * @returns an object containing redux-act actions mapped to all network states
 */
export const createRequestActions = (tag = '"unnamed"') => {
  return {
    [NetworkState.READY]: createAction(`${tag} - ready`),
    [NetworkState.LOADING]: createAction(`${tag} - loading`),
    [NetworkState.FAILED]: createAction(`${tag} - failed`),
  };
};

/**
 * Creates a generic redux-style requester that calls provided redux actions to dispatch state.
 * @param callbacks  -- set of request actions
 * @param api        -- API data
 * @returns {function(*=): Promise<any | never>}
 */
export const createGenericRequester = (callbacks, api) => {
  return params => {
    callbacks[NetworkState.LOADING]();

    const call = R.view(callLens)(api);

    const withActions = validParams => {
      return new Promise(resolve => {
        call(validParams)
          .then(resolve)
          .catch(error => {
            callbacks[NetworkState.FAILED](error);
          });
      }).then(res => {
        callbacks[NetworkState.READY](new NetworkResponse({
          payload: res.data,
          requestBody: validParams,
        }));
      });
    };

    return R.compose(
      withActions,
      R.view(paramParser)(api)
    )(params);
  };
};
