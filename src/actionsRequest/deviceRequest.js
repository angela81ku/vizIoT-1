'use es6';

import * as deviceApi from 'VizIoT/data/api/devicesApi';
import { deviceActionBundle } from 'VizIoT/actions/deviceActions';
import { createGenericRequester } from 'VizIoT/actions/requestStatusActionFactory';

export const fetchDevices = createGenericRequester(
  deviceActionBundle,
  deviceApi.fetchDevices,
);
