import DeviceActionConstants from "../actions/constants/DeviceActionConstant";
import NetworkState from "../constants/NetworkState";
import uuid from "uuid";

const testDevice = {
  'uuid': uuid(),
  'ip': "192.168.10.115",
  'port':"39490",
};

const defaultState = {
  devices: [testDevice, testDevice, testDevice],
  networkState: NetworkState.READY,
}

export default (state = defaultState, action) => {
  switch (action) {
    case DeviceActionConstants.FETCH_DEVICE_LIST:
      return {
        ...state,
        networkState: NetworkState.LOADING
      }
    case DeviceActionConstants.FINISH_FETCH_DEVICE_LIST:
      return {
        ...state,
        devices: action.data,
        networkState: NetworkState.READY
      }
    default:
      return state;
  }
}