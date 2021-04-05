const _ = require('lodash')
const HttpStatus = require('http-status-codes')

const DeviceDa = require('./device.da')

module.exports = {
  getAllDevices,
  getDeviceConnections,
}

async function getAllDevices(req, res) {
  try {
    const data = await DeviceDa.getAll()
    return res.json(data)
  } catch (e) {
    // TODO: log the error
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send(e.message)
  }
}

async function getDeviceConnections(req, res) {
  try {
    const interval = 60000;
    const endMS = Date.now()
    const startMS = endMS - interval;

    const connections = await DeviceDa.getConnections(startMS, endMS)
    res.status(200);
    res.send({connections})
  } catch (e) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e)
  }
}


