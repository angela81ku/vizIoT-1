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

export const selectBusiestDevice = (state) => {
  const map = selectNumberOfConnections(state);
  const mostPopularEntry = Object.keys(map).reduce((acc, k) => {
    let value = map[k];
    if (value > acc.value) {
      return {
        name: k,
        value,
      };
    }
    return acc;
  }, { name: '~', value: 0 });
  return mostPopularEntry;
};
