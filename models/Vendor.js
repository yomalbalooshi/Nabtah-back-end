const { Schema } = require('mongoose')

const vendorSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String},
    location: {type: String},
  },
  { timestamps: true }
)

module.exports = vendorSchema

