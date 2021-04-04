const { DeviceModel } = require('./device.model')
const { TcpDataModel } = require('../tcpData/tcpData.model')
const { removeLeadingZeros } = require('../../util/FormatUtility')

module.exports = {
  getAll,
  getConnections,
}

async function getAll() {
  return DeviceModel.find({})
}

async function getConnections(startMS, endMS) {
  const resultsFromTcpData = await TcpDataModel.aggregate([
    {
      $match: {
        timestamp: { $gte: startMS, $lte: endMS },
      },
    },
  ])

  const macAddrs = {};
  const devicesDataPromise = await DeviceModel.find().select('macAddress name -_id');
  devicesDataPromise.forEach(entry => macAddrs[entry.macAddress] = { macAddress: entry.macAddress, name: entry.name})

  // console.log(devicesDataPromise)

  const connectionObject = {};

  for (let i = 0; i < resultsFromTcpData.length; ++i) {
    const packet = resultsFromTcpData[i];
    if (packet.hasOwnProperty('src_mac') && packet.hasOwnProperty('dst_mac') && packet.hasOwnProperty('packet_size')) {

      let macKey = '';
      let name = '';
      let destName = '';

      const fixedSrc = removeLeadingZeros(packet.src_mac)
      const fixedDst = removeLeadingZeros(packet.dst_mac)

      if (macAddrs.hasOwnProperty(fixedSrc)) {
        macKey = fixedSrc + '--' + fixedDst;
        name = macAddrs[fixedSrc].name;
        destName = fixedDst
      } else if (macAddrs.hasOwnProperty(fixedDst)) {
        macKey = fixedDst + '--' + fixedSrc;
        name = macAddrs[fixedDst].name,
        destName = fixedSrc
      } else {
        continue;
      }

      // if connection exists, don't do any additional calculations
      if (connectionObject.hasOwnProperty(macKey)) {
        continue;
      }
      // otherwise creat new entries
      else {
        connectionObject[macKey] = {
          id: macKey,
          name: name,
          destName: destName,
        }
      }
    }
  }

  // convert object into connectiosn after all data has been aggregated
  const connections = Object.keys(connectionObject).map(key => {
    return connectionObject[key];
  });

  return connections

}
