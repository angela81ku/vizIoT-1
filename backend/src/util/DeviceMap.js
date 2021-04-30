const {DeviceModel} = require('../api/device/device.model')
const {IPModel} = require('../api/ip/ip.model')

module.exports = {
  getDeviceMap,
  getKnownIPMap,
}

async function getDeviceMap() {
  const macAddrs = {}
  const devicesDataPromise = await DeviceModel.find().select('macAddress name -_id')
  devicesDataPromise.forEach(entry => macAddrs[entry.macAddress] = {macAddress: entry.macAddress, name: entry.name})
  return macAddrs
}

async function getKnownIPMap() {
  const ips = {}
  const ipDataPromise = await IPModel.find().select('ip name -_id')
  ipDataPromise.forEach(entry => ips[entry.ip] = {ip: entry.ip, name: entry.name})
  return ips
}