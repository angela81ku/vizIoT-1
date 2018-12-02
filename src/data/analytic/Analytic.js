'use es6';

import { Record, Set, Map } from 'immutable';

export default new Record({
  idSet: Set(),
  idToAnalytic: Map(),
  idToNetworkState: Map(),
});
