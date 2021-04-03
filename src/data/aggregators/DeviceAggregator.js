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
    // inTraffic: device.in,
    // outTraffic: device.out,
    // totalTraffic: device.total,
    // tcpTraffic: device.tcp,
    // udpTraffic: device.udp,
    // httpTraffic: device.http,
    // dnsTraffic: device.dns,
    // velocity: device.velocity,
  }
}

export const getDevices = () => {
  //return all collected devices
  return devices;
}

export const getDeviceIOData = () => {

  const ioDevices = {};
  Object.keys(devices).forEach(d => {
    const device = devices[d];
    ioDevices[d] = {
      _id: device._id,
      macAddress: device.macAddress,
      name: device.name,
      category: device.category,
      dataStreams: [device.totalTraffic, device.inTraffic, device.outTraffic],
      velocity: device.velocity,
    }
  })

  return ioDevices

}

export const getDeviceProtocolData = () => {

  const protocolDevices = {};
  Object.keys(devices).forEach(d => {
    const device = devices[d];
    protocolDevices[d] = {
      _id: device._id,
      macAddress: device.macAddress,
      name: device.name,
      category: device.category,
      dataStreams: [device.tcpTraffic, device.udpTraffic, device.httpTraffic, device.dnsTraffic],
      velocity: device.velocity,
    }
  })

  return protocolDevices;

}