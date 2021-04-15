'use es6';

import {analyticActionBundle} from '../actions/analyzeActions';
import {createGenericRequester} from '../actions/requestStatusActionFactory';
import {analyzeApi, analyzeApiKeys} from '../data/api/analyzeApi';

export const fetchAnalytic = createGenericRequester(
  analyticActionBundle,
  analyzeApi[analyzeApiKeys.TESTING],
);
