'use es6';

import {Record} from 'immutable';
import {identity} from 'ramda';

/* Api Entity */
// Note: using records as a temporary way to define shape, before using typescript
export default new Record({
  call: null,
  paramParser: identity,
  resParser: identity,
});
