const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ServiceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    available: { type: Boolean, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    frequency: { type: String, required: true },
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor' }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Service', ServiceSchema)
