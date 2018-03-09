import MomentUnit from '../../constants/MomentUnit';
import { combineReducers } from 'redux';
import deviceList from './deviceList';
import lastSeen from './lastSeen';
import numberOfConnections from './numberOfConnections';

const defaultRefreshConfig = {
  default: {
    unit: MomentUnit.SECONDS,
    value: 10,
  },
  deviceList: {
    unit: MomentUnit.SECONDS,
    value: 10,
  },
  lastSeen: {
    unit: MomentUnit.SECONDS,
    value: 10,
  },
  numberOfConnections: {
    unit: MomentUnit.SECONDS,
    value: 10,
  },
};

const defaultNetwork = {
  id: 123,
  alias: 'Entire Network',
};

export default combineReducers({
  entireNetwork: (state, action) => defaultNetwork,
  refreshConfig: (state, action) => defaultRefreshConfig,
  deviceList,
  lastSeen,
  numberOfConnections,
});
