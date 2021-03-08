const devices = {};

export const addDevice = (device) => {

  const deviceMac = device.macAddress;
  // if data does not exist for this device, create a new entry
  if (!devices.hasOwnProperty(deviceMac)) {
    const dataVals = [device.data]
    devices[deviceMac] = {
      _id: device._id,
      macAddress: device.macAddress,
      name: device.name,
      category: device.category,
      data: dataVals,
      inTraffic: device.in,
      outTraffic: device.out,
      totalTraffic: device.total,
    }
  }
  // otherwise append data to existing entry
  else {
    let currData = devices[device.macAddress].data;
    currData.push(device.data)
    // if data is greater than 70, replace object value
    if (currData.length > 70) {
      currData = currData.slice(-70);
      devices[device.macAddress] = {
        _id: device._id,
        macAddress: device.macAddress,
        name: device.name,
        category: device.category,
        data: currData,
        inTraffic: device.in,
        outTraffic: device.out,
        totalTraffic: device.total,
      }
    }
  }
}

export const getDevices = () => {
  return devices;
}