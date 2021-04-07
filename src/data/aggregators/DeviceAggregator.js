const devices = {};

export const addDevice = (device) => {

  const deviceMac = device.macAddress;
  // creates a new entry for device if none exists
  // updates an existing entry for device if one already exists
  devices[deviceMac] = {
    _id: device._id,
    macAddress: device.macAddress,
    name: device.name,
    category: device.category,
  }

}

export const getDevices = () => {
  //return all collected devices
  return devices;
}
