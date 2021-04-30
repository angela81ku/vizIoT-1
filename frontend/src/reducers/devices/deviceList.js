'use es6';

import {createRequestReducer} from 'VizIoT/reducers/requests/requestState';
import {deviceActionBundle} from 'VizIoT/actions/deviceActions';
import {fetchDevices} from 'VizIoT/data/api/devicesApi';
import {createDeviceList} from 'VizIoT/data/device/Device';
import * as R from 'ramda';
import {resParser} from 'VizIoT/data/api/ApiLenses';
import {payload} from 'VizIoT/data/api/NetworkResponseLenses';

export default createRequestReducer(
  {value: null},
  deviceActionBundle,
  (state, rawRequestData) => ({
    value: R.compose(
      createDeviceList,
      R.view(resParser)(fetchDevices),
      R.view(payload),
    )(rawRequestData),
  })
);

/*

 // [<client-module>] schema: <data-module>


 // [React trigger]
 0. activate call (raw params object (optional))

 // [Action + Reducer] schema: API module
 1. setup and call API (raw params -> paramParser -> promise)
 2. response from server (promise -> raw payload object -> ResponseRecord)

 // [Action + Reducer] schema: DATA module
 3. hydrate data model (ResponseRecord -> DeviceRecord (for example))

 // [Selector] schema: DATA module
 4. Selector uses data module (state -> DeviceRecord -> primatives)

 // [React] render
 5. React (primitives -> render + controller logic)
*/