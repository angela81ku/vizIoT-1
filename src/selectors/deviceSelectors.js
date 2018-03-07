// Returns all devices
export const selectAllDevices = ({ devices }) => {
  return devices.devices;
};

export const selectNumberOfDevices = (state) => {
  let deviceList = selectAllDevices(state);
  return deviceList ? deviceList.length : 0;
};

export const selectEntireNetwork = ({ devices }) => {
  return devices.entireNetwork;
};
