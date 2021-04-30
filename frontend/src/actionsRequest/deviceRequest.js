'use es6';

import * as deviceApi from '../data/api/devicesApi';
import {deviceActionBundle} from '../actions/deviceActions';
import {createGenericRequester} from '../actions/requestStatusActionFactory';

export const fetchDevices = createGenericRequester(
  deviceActionBundle,
  deviceApi.fetchDevices,
);
