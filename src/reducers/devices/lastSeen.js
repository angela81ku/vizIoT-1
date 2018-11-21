'use es6';

import NetworkState from '../../constants/NetworkState';
import MomentUnit from '../../constants/MomentUnit';
import { createRequestReducer } from 'VizIoT/reducers/requests/requestState';
import { deviceActionBundle } from 'VizIoT/actions/deviceActions';

const defaultState = {
  value: {},
  refreshRate: {
    unit: MomentUnit.SECONDS,
    value: 1,
  },
  networkState: NetworkState.READY,
};

export default createRequestReducer(defaultState, deviceActionBundle);
