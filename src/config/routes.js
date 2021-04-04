
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

  app.get('/api/v1/device/connections', async (req, res) => {
    const interval = 60000;
    const endMS = Date.now()
    const startMS = endMS - interval;

    const connections = await getConnections(startMS, endMS)
    res.status(200);
    res.send({connections})
  })

  app.get('/api/v1/device/connections/1s', async (req,res) => {

    const currTime = Date.now();
    const connections = [];
    for (let i = 0; i < 35; ++i) {
      const endMS = (currTime - (i * 1000))
      const startMS = endMS - 1000;
      const currConns = await getConnectionSentReceivedDataByTime(startMS, endMS)
      connections.push(...currConns)
    }

    res.status(200);
    res.send({connections});
  })

  app.get('/api/v1/device/connections/5s', async (req, res) => {
    let connections = await getConnectionSentReceivedDataWithinNSeconds(5000)
    res.status(200);
    res.send({connections})
  })

  app.get('/api/v1/device/connections/60s', async (req, res) => {
    let connections = await getConnectionSentReceivedDataWithinNSeconds(60000)
    res.status(200);
    res.send({connections})
  })
}
