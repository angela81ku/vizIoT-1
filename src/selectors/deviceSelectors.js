// Returns a list of device objects
export const selectDeviceList = ({ devices: { deviceList: { value } } }) => {
  return value;
};

export const selectNumberOfDevices = state => {
  let deviceList = selectDeviceList(state);
  return deviceList ? deviceList.length : 0;
};

export const selectEntireNetwork = ({ devices: { entireNetwork } }) => {
  return entireNetwork;
};

/**
 * Returns a map of device.macAddr -> last seen
 */
export const selectLastSeen = ({ devices: { lastSeen: { value } } }) => {
  return value;
};

export const selectNumberOfConnections = ({
  devices: { numberOfConnections: { value } },
}) => {
  return value;
};
