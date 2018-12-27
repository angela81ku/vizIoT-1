'use es6';

import { Record } from 'immutable';
import keymirror from 'keymirror';

export const Keys = keymirror({
  MAC_ADDRESS: null,
  LAST_SIZE: null,
  LAST_SIZE_SAMPLES: null,
  NAME: null,
  RECENT_SIZE_SUM: null,
  SIZE_TOTAL_TODAY: null,
  SIZE_IN_TODAY: null,
  SIZE_OUT_TODAY: null,
});

export const DeviceData = new Record({
  [Keys.MAC_ADDRESS]: null,
  [Keys.LAST_SIZE]: null,
  [Keys.LAST_SIZE_SAMPLES]: null,
  [Keys.RECENT_SIZE_SUM]: null,
  [Keys.SIZE_TOTAL_TODAY]: null,
  [Keys.SIZE_IN_TODAY]: null,
  [Keys.SIZE_OUT_TODAY]: null,
  [Keys.NAME]: null, // TODO temporary for prove of concept
});

