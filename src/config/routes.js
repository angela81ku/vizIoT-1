
const tcpDataApi = require('../api/tcpData/index')
const deviceApi = require('../api/device/index')
const {getConnections} = require('../api/device/device.da')
const {getConnectionSentReceivedDataWithinNSeconds,
       getConnectionSentReceivedDataByTime,
} = require('../api/tcpData/tcpData.da')

const API_V1 = '/api/v1'

module.exports = app => {
  app.get(API_V1, (req, res) => {
    res.json({ version: 1 })
  })

  app.use(API_V1, tcpDataApi)
  app.use(API_V1, deviceApi)

}
