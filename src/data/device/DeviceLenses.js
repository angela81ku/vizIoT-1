'use es6';

import * as R from 'ramda';
import { mapped } from 'ramda-lens'
import immLens from 'VizIoT/data/immLens';
import { DeviceData, Keys } from 'VizIoT/data/device/DeviceData';
import { standardize, compare as compareMac } from 'mac-address-util';

// Lens
export const macAddress = immLens('macAddress');

export const devices = R.lensProp('devices');

export const deviceList = R.compose(devices, R.lensProp('deviceList')); // note: lenses should be in left to right order.
export const deviceListValue = R.compose(deviceList, R.lensProp('value'));

const doesDeviceHasMacAddress = macAddressValue =>
  R.compose(
    mac => compareMac(macAddressValue, mac),
    R.view(macAddress)
  );

export const findDeviceByMac = macAddressValue => R.compose(
  R.find(doesDeviceHasMacAddress(macAddressValue)),
  R.view(deviceListValue)
);

export const idList = R.compose(deviceListValue, mapped, immLens('_id'));
export const nameList = R.compose(deviceListValue, mapped, immLens('name'));
export const count = R.compose(deviceListValue, R.lensProp('size'));



// generic graph:
//   * wrap with report config (report config decorator mapDataToProps) -> compute into hash -> select data using hash -> feed to graph -> render
//
// const propToConfig = {
//   numberOfActiveDevices: new ReportConfigAndTransformation(new Config(...), new Resolver (can be some default config resolver), new Transformation());
//   ...
// };
//
// const connectData = propToConfig => Comp => {
//
//   onMount => propToConfig.map((prop, {resolver}) => resolver(config))
//
//   return connect((state) => propToConfig.map((prop, {config, transform}) => { [prop]: transform(selectDataWithConfig(state)), Comp);
// }
//
// connectData(propToConfig)(quickfacts);

// Redux
// {
//   report: {
//     ['hash for report config']: {
//       config: "report config object"
//     }
//   }
// }