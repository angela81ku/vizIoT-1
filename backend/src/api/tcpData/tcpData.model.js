const mongoose = require('mongoose')

const TcpDataSchema = new mongoose.Schema({
  src_ip: String,
  dst_ip: String,
  dst_mac: String,
  src_mac: String,
  dst_port: String,
  src_port: String,
  packet_size: String,
  protocols: Array,
  timestamp: {type: Number, required: true},
}, {
  autoIndex: false,
})

const TcpDataString = 'TcpData'
const TcpDataModel = mongoose.model(TcpDataString, TcpDataSchema)

module.exports = {
  TcpDataSchema,
  TcpDataString,
  TcpDataModel,
}
