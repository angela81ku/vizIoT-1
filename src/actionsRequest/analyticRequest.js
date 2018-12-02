'use es6';

import { analyticActionBundle } from 'VizIoT/actions/analyzeActions';
import { createGenericRequester } from 'VizIoT/actions/requestStatusActionFactory';
import { analyzeApi, analyzeApiKeys } from 'VizIoT/data/api/analyzeApi';

export const fetchAnalytic = createGenericRequester(
  analyticActionBundle,
  analyzeApi[analyzeApiKeys.TESTING],
);
