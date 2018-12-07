'use es6';

import { List, Record } from 'immutable';

/* Device entity */

export const Device = new Record({
  _id: null,
  name: null,
  shortName: null,
  category: null,
});

/**
 * Create a List<Devices> given the device response data
 * @param immutableRes -- the response immutable object that contains the device list data.
 * @returns List<Devices>
 */
export const createDeviceList = immutableRes => {
  return List(
    immutableRes.map(deviceData => {
      return new Device(deviceData);
    }));
};