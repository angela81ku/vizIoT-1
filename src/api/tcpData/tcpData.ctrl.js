const _ = require('lodash')
const HttpStatus = require('http-status-codes')

const TcpDataDa = require('./tcpData.da')

module.exports = {
  getRecentDataWithinNSeconds,
  getOneSecondDeviceConnectionData,
  getFiveSecondDeviceConnectionData,
  getThirtySecondDeviceConnectionData,
}

async function getRecentDataWithinNSeconds(req, res) {
  let {pastMS} = req.body
  pastMS = parseInt(pastMS)
  if (!_.isNumber(pastMS) || _.isNaN(pastMS)) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send(`Illegal Argument pastMS, expected Number, got ${pastMS}`)
  }
  const data = await TcpDataDa.getRecentDataWithinNSeconds(pastMS)
  return res.json(data)
}

async function getOneSecondDeviceConnectionData(req, res) {
  try {
    const currTime = Date.now()
    const connections = []
    for (let i = 0; i < 35; ++i) {
      const endMS = (currTime - (i * 1000))
      const startMS = endMS - 1000
      const currConns = await TcpDataDa.getConnectionSentReceivedDataByTime(startMS, endMS)
      connections.push(...currConns)
    }

    res.status(200)
    res.send({connections})
  } catch (e) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e)
  }
}

async function getFiveSecondDeviceConnectionData(req, res) {
  try {
    let connections = await TcpDataDa.getConnectionSentReceivedDataWithinNSeconds(5000)
    res.status(200)
    res.send({connections})
  } catch (e) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e)
  }
}

async function getThirtySecondDeviceConnectionData(req, res) {
  try {
    let connections = await TcpDataDa.getConnectionSentReceivedDataWithinNSeconds(30000)
    res.status(200)
    res.send({connections})
  } catch (e) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e)
  }
}
