const devices = {};

export const addDevice = (device) => {

  const deviceMac = device.macAddress;
  // if data does not exist for this device, create a new entry
  devices[deviceMac] = {
    _id: device._id,
    macAddress: device.macAddress,
    name: device.name,
    category: device.category,
    inTraffic: device.in,
    outTraffic: device.out,
    totalTraffic: device.total,
    velocity: device.velocity,
  }
}

export const getDevices = () => {
  return devices;
}