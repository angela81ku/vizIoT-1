'use es6';

import * as R from 'ramda';
import { mapped } from 'ramda-lens'
import immLens from 'VizIoT/data/immLens';
import * as device from 'VizIoT/data/device/DeviceLenses';
import { deviceListValue } from 'VizIoT/data/device/DeviceLenses';
import { Map } from 'immutable';

// TODO
export const allDataStreamForDevice = deviceId => { stream.byId(buildStreamKey(deviceId)) };
export const allDataAnalyticForDevice = deviceId => { analytic.byId(buildAnalyticKey(deviceId)) };
export const allDataForDevice = deviceId => {
  allDataStreamForDevice(deviceId).merge(allDataAnalyticForDevice(deviceId))
};

const getDeviceData = (device, key) => allDataForDevice(key);
export const allData = R.compose(R.mapObjIndexed(getDeviceData), R.view(deviceListValue));
