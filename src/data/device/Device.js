'use es6';

import { List, Record } from 'immutable';
import { standardize } from 'mac-address-util';
import * as R from 'ramda';
import immLens from 'VizIoT/data/immLens';

/* Device entity */

export const Device = new Record({
  _id: null,
  name: null,
  shortName: null,
  category: null,
  macAddress: null,
});

/**
 * Create a List<Devices> given the device response data
 * @param immutableRes -- the response immutable object that contains the device list data.
 * @returns List<Devices>
 */
export const createDeviceList = immutableRes => {
  return List(
    immutableRes
      .map(deviceData => {
        const stdDeviceData = R.over(immLens('macAddress'), standardize)(deviceData);
        return new Device(stdDeviceData);
      }));
};