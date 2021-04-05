const { DeviceModel } = require('./device.model')
const { TcpDataModel } = require('../tcpData/tcpData.model')
const { removeLeadingZeros } = require('../../util/FormatUtility')
const maxmind = require('maxmind')

let db = undefined;
let countryIPs = {};

module.exports = {
  getAll,
  getConnections,
  startCountryDB
}

async function startCountryDB() {
  console.log(process.cwd())
  const dbPath = process.cwd() + '/src/db/GeoLite2-Country.mmdb'
  db = await maxmind.open(dbPath);
  // console.log('await done')
  // console.log(db.get('8.8.8.8').country.iso_code)
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
      let ip = '';

      const fixedSrc = removeLeadingZeros(packet.src_mac)
      const fixedDst = removeLeadingZeros(packet.dst_mac)

      if (macAddrs.hasOwnProperty(fixedSrc)) {
        macKey = fixedSrc + '--' + fixedDst;
        name = macAddrs[fixedSrc].name;
        destName = fixedDst;
        ip = packet.dst_ip;
      } else if (macAddrs.hasOwnProperty(fixedDst)) {
        macKey = fixedDst + '--' + fixedSrc;
        name = macAddrs[fixedDst].name;
        destName = fixedSrc;
        ip = packet.src_ip;
      } else {
        continue;
      }

      let country = undefined;

      if (countryIPs.hasOwnProperty(ip)) {
        country = countryIPs[ip].country;
      } else {
        const res = await db.get(ip);
        if (res && res.country && res.country.iso_code) {
          country = res.country.iso_code;
          countryIPs[ip].country = country;
        }
      }

      // otherwise creat new entries
      // if connection exists, don't do any additional calculations
      if (connectionObject.hasOwnProperty(macKey)) {
        continue;
      } else {
        connectionObject[macKey] = {
          id: macKey,
          name: name,
          destName: destName,
          country: country,
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
