'use es6';

import { Record } from 'immutable';

// Note: using records as a temporary way to define shape, before using typescript
export default new Record({
  idSet: new Set([]),
  idToAnalytic: {},
  idToNetworkState: {},
});
