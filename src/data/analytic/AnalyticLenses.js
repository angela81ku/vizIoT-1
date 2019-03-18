'use es6';

import * as R from 'ramda';
import immLens from 'VizIoT/data/immLens';
import * as networkResponse from 'VizIoT/data/api/NetworkResponseLenses';
import NetworkState from 'VizIoT/constants/NetworkState';

export const analyticRoot = R.lensProp('value');
export const ids = R.compose(analyticRoot, immLens('idSet'));
export const idToAnalytic = R.compose(analyticRoot, immLens('idToAnalytic'));
export const idToNetworkState = R.compose(analyticRoot, immLens('idToNetworkState'));

export const getIds = R.view(ids);
export const getIdToAnalytic = R.view(idToAnalytic);
export const getIdToNetworkState = R.view(idToNetworkState);

const immSet = (id, item) => collection => collection[id] = item;

// id -> state
export const addId = id => R.over(ids, R.append(id));
export const mapIdToAnalytic = (id, analytic) => R.over(idToAnalytic, immSet(id, analytic));
export const mapIdToSuccess = id => R.over(idToNetworkState, immSet(id, NetworkState.READY));

export const updateWithResponse = (response) => state => {
  const id = networkResponse.getRequestBody(response).hashCode();
  const analytic = networkResponse.getPayload(response);
  return R.compose(
    addId(id),
    mapIdToAnalytic(id, analytic),
    mapIdToSuccess(id),
  )(state);
};