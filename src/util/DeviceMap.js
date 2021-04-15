const {DeviceModel} = require('../api/device/device.model')

module.exports = {
  getDeviceMap,
}

async function getDeviceMap() {
  const macAddrs = {}
  const devicesDataPromise = await DeviceModel.find().select('macAddress name -_id')
  devicesDataPromise.forEach(entry => macAddrs[entry.macAddress] = {macAddress: entry.macAddress, name: entry.name})
  return macAddrs
}