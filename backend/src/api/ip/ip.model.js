const mongoose = require('mongoose')

const IPSchema = new mongoose.Schema({
  ip: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})


const IPString = 'IPs'
const IPModel = mongoose.model(IPString, IPSchema)

module.exports = {
  IPString,
  IPSchema,
  IPModel,
}