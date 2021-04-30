'use es6';

import {createRequestReducer} from 'VizIoT/reducers/requests/requestState';
import * as analytic from 'VizIoT/data/analytic/AnalyticLenses';
import {analyticActionBundle} from 'VizIoT/actions/analyzeActions';
import Analytic from 'VizIoT/data/analytic/Analytic';

export default createRequestReducer(
  {value: new Analytic()},
  analyticActionBundle,
  (state, rawRequestData) => analytic.updateWithResponse(rawRequestData)(state),
);
