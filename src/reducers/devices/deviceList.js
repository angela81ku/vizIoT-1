'use es6';

import { createRequestReducer } from 'VizIoT/reducers/requests/requestState';
import { deviceActionBundle } from 'VizIoT/actions/deviceActions';

export default createRequestReducer(
  { value: null },
  deviceActionBundle,
  (state, rawRequestData) => {
    return {
      value: rawRequestData.payload.devices.map(d => {
        return {
          ...d,
          macAddr: d.macAddress,
        };
      })
    };
  }
);
