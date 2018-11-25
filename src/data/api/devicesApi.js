'use es6';

import axios from 'axios';
import { headers, baseUrl } from '../../constants/RequestConstants';
import { fromJS, Record } from 'immutable';
import ApiRecord from 'VizIoT/data/api/Api';
import List from 'react-virtualized/dist/es/List/List';
import { createMockCall } from 'VizIoT/utility/ApiUtility';

export const fetchDevices = new ApiRecord({
  call: ({ networkId }) => {
    return createMockCall({data: {
      devices: [{
        id: 0,
        name: 'Google Home Mini',
      }],
    }});

    // TODO enable bellow
    // const url = `${baseUrl}/api/networks/${networkId}/devices`;
    // return axios.get(url, { headers });
  },
  paramParser: p => new Record({ networkId: null })(p),
  resParser: fromJS,
});
