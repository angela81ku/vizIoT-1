'use es6';

import axios from 'axios';
import {headers, baseUrlApi} from '../../constants/RequestConstants';
import {Record} from 'immutable';
import ApiRecord from './Api';
import {createMockCall} from 'VizIoT/utility/ApiUtility';
import {addDevice, getDevices} from '../aggregators/DeviceAggregator';
import {addConnections, updateConnectionListeners} from '../aggregators/ConnectionAggregator';

export const fetchDevices = new ApiRecord({
  call: ({networkId}) => {
    // return createMockCall({data: [
    //     {
    //       _id: 0,
    //       name: 'Google Home Mini',
    //       shortName: 'MINI',
    //       category: 'Voice Assistant',
    //     },
    //     {
    //       _id: 1,
    //       name: 'Xiaomi Rice Cooker',
    //       shortName: 'RICE',
    //       category: 'Appliance',
    //     },
    //     {
    //       _id: 2,
    //       name: 'Philips Hue',
    //       shortName: 'HUE',
    //       category: 'Lighting',
    //     }
    //   ]
    // });

    const url = `${baseUrlApi}/device/all`;
    return axios.get(url, {headers});
  },
  paramParser: p => new Record({networkId: null})(p),
});

export async function fetchDeviceData() {
  const url = `${baseUrlApi}/device/all`;
  const res = await axios.get(url, {headers})
  const devices = res.data;
  devices.forEach(d => {
    addDevice(d);
  })
}

export async function fetchDeviceConnections() {
  const url = `${baseUrlApi}/device/connections`;
  const res = await axios.get(url, {headers})
  const connections = res.data.connections;
  addConnections(connections);
  updateConnectionListeners();
}
