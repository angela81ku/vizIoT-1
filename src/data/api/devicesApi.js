'use es6';

import axios from 'axios';
import { headers, baseUrl } from '../../constants/RequestConstants';
import { Record } from 'immutable';
import ApiRecord from 'VizIoT/data/records/ApiRecord';

export const fetchDevices = new ApiRecord({
  call: ({ networkId }) => {
    const url = `${baseUrl}/api/networks/${networkId}/devices`;
    return axios.get(url, { headers });
  },
  ParamRecord: new Record({ networkId: null }),
});
