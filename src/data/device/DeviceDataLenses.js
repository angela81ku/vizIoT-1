'use es6';

import * as R from 'ramda';
import { mapped } from 'ramda-lens'
import immLens from 'VizIoT/data/immLens';
import * as device from 'VizIoT/data/device/DeviceLenses';
import { DeviceData, Keys } from 'VizIoT/data/device/DeviceData';
import moment from 'moment';
import { compare, standardize } from 'mac-address-util';
import { tap } from 'VizIoT/utility/Debugging';

// DeviceData
export const macAddress = immLens(Keys.MAC_ADDRESS);
export const lastSize = immLens(Keys.LAST_SIZE);
export const lastSizeSamples = immLens(Keys.LAST_SIZE_SAMPLES);
export const recentSizeSum = immLens(Keys.RECENT_SIZE_SUM);
export const sizeTotalToday = immLens(Keys.SIZE_TOTAL_TODAY);
export const sizeInToday = immLens(Keys.SIZE_IN_TODAY);
export const sizeOutToday = immLens(Keys.SIZE_OUT_TODAY);

// id -> DeviceData
export const makeMacAddressLens = macAddress => R.lensProp(macAddress);

export const takeTop3Size = R.compose(
  R.map(R.nth(1)), // TODO can be optimized
  R.take(3),
  R.sort(R.descend(R.pipe(R.nth(1), R.view(recentSizeSum)))),
  R.toPairs,
  R.defaultTo({}),
);

// Data Manipulation
// export const allDataStreamForDevice = deviceId => { stream.byId(buildStreamKey(deviceId)) };
// export const allDataAnalyticForDevice = deviceId => { analytic.byId(buildAnalyticKey(deviceId)) };
// export const allDataForDevice = deviceId => {
//   allDataStreamForDevice(deviceId).merge(allDataAnalyticForDevice(deviceId))
// };

// const getDeviceData = (device, key) => allDataForDevice(key);
// export const allData = R.compose(R.mapObjIndexed(getDeviceData), R.view(deviceListValue));

const tempBlacklist = ['22:ef:03:1a:97:b9', 'ff:ff:ff:ff:ff:ff'];

export const createDeviceDataMap = arg => {
  const { startMS } = arg;

  const macLens = R.lensProp('macAddress');

  return R.compose(
    R.indexBy(pass => R.view(macAddress, pass)),
    R.map(({ size, name,  macAddress }) => new DeviceData({
      [Keys.MAC_ADDRESS]: macAddress,
      [Keys.LAST_SIZE]: size,
      [Keys.LAST_SIZE_SAMPLES]: [{ size, startMS }],
      [Keys.NAME]: name,
    })),
    R.filter(({ macAddress }) => !R.includes(macAddress, tempBlacklist)),
    R.map(R.over(macLens, standardize)),
    R.view(R.lensProp('size')),
  )(arg);
};

const getSamplesSum = R.compose(
  R.sum,
  R.map(R.view(R.lensProp('size'))),
  R.view(lastSizeSamples),
);

const filterSamples = R.filter(data => moment().subtract(30, 'second').valueOf() < data.startMS);


const refreshDeviceData = deviceData => {
  const refreshSamples = R.compose(
    filterSamples,
    R.defaultTo({}),
    R.view(lastSizeSamples)
  );

  return R.compose(
    updated => R.set(recentSizeSum, getSamplesSum(updated), updated),
    updated => R.set(lastSizeSamples, refreshSamples(updated), updated),
  )(deviceData);
};

// {}, {} -> {}
// {}, {2} -> {2}
// {2}, {} -> {2]
// {1, 2}, {2, 3} -> {1, 2', 3}
// 1 update original
// 2 merge with incoming
export const updateDeviceDataMaps = (original, incoming) => {
  const updateOriginal = R.compose(
    R.map(refreshDeviceData),
    R.defaultTo({}),
  );

  return R.compose(
    R.flip(mergeDeviceDataMaps)(reassignObject(incoming)),
    updateOriginal,
  )(original);
};

const reassignObject = o => {
  return { ...o };
};


const updateDeviceData = (l, r) => {
  const combineSamples = R.compose(
    filterSamples,
    R.concat(l.get(Keys.LAST_SIZE_SAMPLES)),
    R.defaultTo([]),
    R.view(lastSizeSamples)
  );

  const final = R.compose(
    updatedR => R.set(recentSizeSum, getSamplesSum(updatedR), updatedR),
    updatedR => R.set(lastSizeSamples, combineSamples(updatedR), updatedR),
  )(r);

  return new DeviceData(final);
};

// r is the new data
export const mergeDeviceDataMaps = R.mergeWithKey((k, l, r) => {
  const updatedData = updateDeviceData(l, r);
  // console.log(updatedData);
  return updatedData;
});
