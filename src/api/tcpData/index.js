
const express = require('express')
const ctrl = require('./tcpData.ctrl')

const router = express.Router()

router
  .route('/tcpData/recentData')
  // GET /api/v1/tcpData/recentData - Get list of recentTcpData
  .post(ctrl.getRecentDataWithinNSeconds)

router
  .route('/tcpData/connections/1s')
  .get(ctrl.getOneSecondDeviceConnectionData)

router
  .route('/tcpData/connections/5s')
  .get(ctrl.getFiveSecondDeviceConnectionData)

router
  .route('/tcpData/connections/30s')
  .get(ctrl.getThirtySecondDeviceConnectionData)

module.exports = router
