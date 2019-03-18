'use es6';

import { Record } from 'immutable';
import { standardize as standardizeMac } from 'mac-address-util';
import * as R from 'ramda';

/* Device entity */

// Note: using records as a temporary way to define shape, before using typescript
export default class Device extends Record(
  {
    _id: null,
    name: null,
    shortName: null,
    category: null,
    macAddress: null,
  },
  'Device'
) {
  toString() {
    return `${this._id},${this.name},${this.shortName},${this.category},${this.macAddress}`;
  }
};


/**
 * Create a [<Devices>] given the device response data
 * @param res -- the response object with the device list data.
 * @returns [<Devices>]
 */
export const createDeviceList = R.map(
  deviceFromRes => {
    const stdDeviceData = R.over(R.lensProp('macAddress'), standardizeMac, deviceFromRes);
    return new Device(stdDeviceData);
  }
);