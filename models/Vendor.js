const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const VendorSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    location: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Vendor', VendorSchema)
