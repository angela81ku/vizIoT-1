'use es6';

import * as R from 'ramda';
import immLens from 'VizIoT/data/immLens';

export const payload = immLens('payload');
export const requestBody = immLens('requestBody');

export const getPayload = R.view(payload);
export const getRequestBody = R.view(requestBody);